import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

const AccordionContext = React.createContext({
  expandedValues: new Set(),
  toggleValue: () => {},
  type: 'single',
})

const AccordionItemContext = React.createContext({
  value: '',
  isOpen: false,
})

export function Accordion({
  children,
  defaultValue = [],
  value,
  onValueChange,
  type = 'single',
  collapsible = true,
  className = '',
  ...props
}) {
  const [internalValues, setInternalValues] = React.useState(() => {
    if (value !== undefined) {
      return new Set(Array.isArray(value) ? value : [value])
    }
    const init = Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    return new Set(init.filter(Boolean))
  })

  const expandedValues = React.useMemo(() => {
    if (value !== undefined) {
      return new Set(Array.isArray(value) ? value : [value])
    }
    return internalValues
  }, [value, internalValues])

  const toggleValue = React.useCallback((itemVal) => {
    let nextSet = new Set(expandedValues)
    if (expandedValues.has(itemVal)) {
      if (collapsible || type === 'multiple') {
        nextSet.delete(itemVal)
      }
    } else {
      if (type === 'single') {
        nextSet = new Set([itemVal])
      } else {
        nextSet.add(itemVal)
      }
    }

    if (value === undefined) {
      setInternalValues(nextSet)
    }
    if (onValueChange) {
      onValueChange(type === 'single' ? (Array.from(nextSet)[0] || '') : Array.from(nextSet))
    }
  }, [expandedValues, collapsible, type, value, onValueChange])

  return (
    <AccordionContext.Provider value={{ expandedValues, toggleValue, type }}>
      <div className={cn('accordion-root w-full', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({
  children,
  value,
  className = '',
  ...props
}) {
  const { expandedValues } = React.useContext(AccordionContext)
  const isOpen = expandedValues.has(value)

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div
        className={cn('accordion-item', isOpen ? 'open' : '', className)}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

export function AccordionTrigger({
  children,
  className = '',
  ...props
}) {
  const { toggleValue } = React.useContext(AccordionContext)
  const { value, isOpen } = React.useContext(AccordionItemContext)

  return (
    <button
      type="button"
      className={cn('accordion-trigger', className)}
      onClick={() => toggleValue(value)}
      aria-expanded={isOpen}
      data-state={isOpen ? 'open' : 'closed'}
      {...props}
    >
      <span className="accordion-trigger-text">{children}</span>
      <ChevronDown
        className={cn('accordion-chevron', isOpen ? 'rotated' : '')}
        size={18}
      />
    </button>
  )
}

export function AccordionContent({
  children,
  className = '',
  ...props
}) {
  const { isOpen } = React.useContext(AccordionItemContext)

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className={cn('accordion-content', className)}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          data-state={isOpen ? 'open' : 'closed'}
          {...props}
        >
          <div className="accordion-content-inner">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Accordion
