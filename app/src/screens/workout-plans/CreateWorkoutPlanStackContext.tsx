import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CreateWorkoutPlanProvider from '../../contexts/TestCreateWorkoutPlanContext'
import CreateWorkoutPlanStackScreen from '../../Stacks/CreateWorkoutPlanStack'

const CreateWorkoutPlanStackContext:React.FC = () => {
  return (
    <CreateWorkoutPlanProvider>
        <CreateWorkoutPlanStackScreen />
    </CreateWorkoutPlanProvider>
  )
}

export default CreateWorkoutPlanStackContext

const styles = StyleSheet.create({})