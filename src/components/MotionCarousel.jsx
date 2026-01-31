import * as React from 'react'
import { motion } from 'motion/react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { RippleButton } from './ui/ripple-button'

const useEmblaControls = (emblaApi) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState([])
  const [prevDisabled, setPrevDisabled] = React.useState(true)
  const [nextDisabled, setNextDisabled] = React.useState(true)

  const onDotClick = React.useCallback(
    (index) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  const onPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const onNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const updateSelectionState = (api) => {
    setSelectedIndex(api.selectedScrollSnap())
    setPrevDisabled(!api.canScrollPrev())
    setNextDisabled(!api.canScrollNext())
  }

  const onInit = React.useCallback((api) => {
    setScrollSnaps(api.scrollSnapList())
    updateSelectionState(api)
  }, [])

  const onSelect = React.useCallback((api) => {
    updateSelectionState(api)
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    emblaApi.on('reInit', onInit).on('select', onSelect)

    return () => {
      emblaApi.off('reInit', onInit).off('select', onSelect)
    }
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    prevDisabled,
    nextDisabled,
    onDotClick,
    onPrev,
    onNext,
  }
}

// Feature Card Carousel for "Comprehensive Solutions"
function FeatureCarousel({ features, getIcon }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'center', 
    loop: true,
    containScroll: false,
  })
  const {
    selectedIndex,
    scrollSnaps,
    onDotClick,
    onPrev,
    onNext,
  } = useEmblaControls(emblaApi)

  return (
    <div className="motion-carousel-v2">
      <div className="carousel-wrapper-v2">
        {/* Left Arrow */}
        <RippleButton 
          variant="default"
          size="iconLg"
          className="carousel-nav-btn carousel-nav-prev" 
          onClick={onPrev}
          aria-label="Previous"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </RippleButton>

        {/* Carousel Viewport */}
        <div className="carousel-viewport-v2" ref={emblaRef}>
          <div className="carousel-container-v2">
            {features.map((feature, index) => {
              const isActive = index === selectedIndex

              return (
                <motion.div
                  key={index}
                  className="carousel-slide-v2"
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9 }}
                >
                  <div className={`carousel-card-v2 ${isActive ? 'active' : ''}`}>
                    <div className="carousel-card-number">{index + 1}</div>
                    <div className="carousel-card-content">
                      <div className="carousel-card-icon">
                        {getIcon(feature.icon)}
                      </div>
                      <h3>{feature.title}</h3>
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <RippleButton 
          variant="default"
          size="iconLg"
          className="carousel-nav-btn carousel-nav-next" 
          onClick={onNext}
          aria-label="Next"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </RippleButton>
      </div>

      {/* Pagination Dots */}
      <div className="carousel-pagination-v2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            label={`Slide ${index + 1}`}
            selected={index === selectedIndex}
            onClick={() => onDotClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

// Process Card Carousel for "How We Work"
function ProcessCarousel({ process, getIcon }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'center', 
    loop: true,
    containScroll: false,
  })
  const {
    selectedIndex,
    scrollSnaps,
    onDotClick,
    onPrev,
    onNext,
  } = useEmblaControls(emblaApi)

  return (
    <div className="motion-carousel-v2">
      <div className="carousel-wrapper-v2">
        {/* Left Arrow */}
        <RippleButton 
          variant="default"
          size="iconLg"
          className="carousel-nav-btn carousel-nav-prev" 
          onClick={onPrev}
          aria-label="Previous"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </RippleButton>

        {/* Carousel Viewport */}
        <div className="carousel-viewport-v2" ref={emblaRef}>
          <div className="carousel-container-v2">
            {process.map((item, index) => {
              const isActive = index === selectedIndex

              return (
                <motion.div
                  key={index}
                  className="carousel-slide-v2"
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9 }}
                >
                  <div className={`carousel-card-v2 ${isActive ? 'active' : ''}`}>
                    <div className="carousel-card-number">{index + 1}</div>
                    <div className="carousel-card-content">
                      <div className="carousel-card-icon">
                        {getIcon(item.icon)}
                      </div>
                      <span className="carousel-step-label">Step {index + 1}</span>
                      <h3>{item.step}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <RippleButton 
          variant="default"
          size="iconLg"
          className="carousel-nav-btn carousel-nav-next" 
          onClick={onNext}
          aria-label="Next"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </RippleButton>
      </div>

      {/* Pagination Dots */}
      <div className="carousel-pagination-v2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            label={`Slide ${index + 1}`}
            selected={index === selectedIndex}
            onClick={() => onDotClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

function DotButton({ selected = false, label, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      initial={false}
      className={`carousel-dot-v2 ${selected ? 'selected' : ''}`}
      animate={{
        backgroundColor: selected ? '#ffffff' : 'rgba(255,255,255,0.4)',
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9 }}
    >
      {selected && (
        <motion.span
          className="carousel-dot-label-v2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9 }}
        >
          {label}
        </motion.span>
      )}
    </motion.button>
  )
}

export { FeatureCarousel, ProcessCarousel }
