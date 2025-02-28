import type React from "react"

import { motion, useInView, type HTMLMotionProps } from "framer-motion"
import { useRef } from "react"

interface ScrollAppearProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode
  delay?: number
  yOffset?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export function ScrollAppear({
  children,
  delay = 0,
  yOffset = 20,
  duration = 0.6,
  threshold = 0.2,
  once = true,
  ...props
}: ScrollAppearProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}