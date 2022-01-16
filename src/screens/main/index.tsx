import React, {useCallback, useState} from 'react'
import { Text, Box, Center, VStack, useColorModeValue, Pressable } from 'native-base'
import { ThemeToggle } from '../../components/atoms/theme-toggle'
import { AnimatedCheckbox } from '../../components/atoms/animated'

export default function MainScreen() {

  const [ checked, setChecked ] = useState<boolean>(false)

  const handlePressCheck = useCallback(() => {
    setChecked(prev => !prev)
    }, [])

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Box
          p={10}
          bg={useColorModeValue('red.500', 'yellow.500')}
          borderRadius={25}
        >
        <Pressable onPress={handlePressCheck}>
          <AnimatedCheckbox checked={checked}/>
        </Pressable>
          <Text>Hello</Text>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}
