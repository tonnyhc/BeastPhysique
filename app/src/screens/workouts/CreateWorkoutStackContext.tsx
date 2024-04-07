import { View, Text } from 'react-native'
import React from 'react'
import { CreateWorkoutProvider } from '../../contexts/CreateWorkoutContext'
import CreateWorkoutsStackScreen from '../../Stacks/CreateWorkoutStack'

const CreateWorkoutStackContext:React.FC = () => {
  return (
    <CreateWorkoutProvider>
      <CreateWorkoutsStackScreen />
    </CreateWorkoutProvider>
  )
}

export default CreateWorkoutStackContext