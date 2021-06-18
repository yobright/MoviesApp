import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function FilmDetail() {
    return (
        <View style={styles.main_container}>
            <Text>Détail du film</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1, 
    }
})