import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FlatCard from './components/cards/FlatCard'
import ElevatedCard from './components/cards/ElevatedCard'
import FancyCard from './components/FancyCard'

export default function AppFlatcard() {
  return (
    <SafeAreaView>
      <ScrollView>
        <FlatCard />
        <ElevatedCard />
        <FancyCard />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})