import React, { useEffect, memo, FC } from 'react'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolateColor,
  interpolate
} from 'react-native-reanimated'
import Svg, { Path, Defs, ClipPath, G } from 'react-native-svg'
import {
  kAnimatedCheckboxMargin,
  kAnimatedCheckboxVWidth,
  kAnimatedCheckboxVHeight
} from '../../../utils/index'

interface Props {
  checked?: boolean
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const AnimatedCheckbox: FC<Props> = ({ checked }) => {

  const progress = useSharedValue(0)

  const checkmarkColour = '#000000'
  const highlightColour = '#ff0000'
  const boxOutlineColour = "#000000"

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: Easing.linear
    })
  }, [checked])

  const animatedBoxProps = useAnimatedProps(
    () => ({
      stroke: interpolateColor(Easing.bezier(0.16, 1, 0.3, 1)(progress.value), [0, 1],
        [boxOutlineColour, highlightColour],
        "RGB"
      ),
      fill: interpolateColor(
        Easing.bezier(0.16, 1, 0.3, 1)(progress.value),
        [0, 1],
        ['#00000000', highlightColour],
        "RGB"
      )
    }), [highlightColour, boxOutlineColour]
  )

  return (
    <Svg viewBox={[-kAnimatedCheckboxMargin, -kAnimatedCheckboxMargin, kAnimatedCheckboxVWidth + kAnimatedCheckboxMargin, kAnimatedCheckboxVHeight + kAnimatedCheckboxMargin].join(' ')}>
      <AnimatedPath d={boxOutlineColour} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" animatedProps={animatedBoxProps}/>
    </Svg>
  )
}
