import { NavigationContainer } from '@react-navigation/native'
import React, { FC } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

interface Props {
    navigation: any
};

export const Home: FC<Props> = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}> 
                <Text style={styles.headerText}> WORKBOOK </Text>
            </View>
            <View style={styles.container}> 
                <Pressable  
                    style={({ pressed }) => [styles.cameraBtn, { opacity: pressed ? 0.5 : 1 }]}
                    onPress={() => navigation.navigate('Camera')}>
                    <Text style={styles.topic}>  Camera </Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.cameraBtn, { opacity: pressed ? 0.5 : 1 }]}
                    onPress={() => navigation.navigate('Scanner')}>
                    <Text style={styles.topic}> Scanner </Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.cameraBtn, { opacity: pressed ? 0.5 : 1 }]}
                    onPress={() => navigation.navigate('QRcode')}>
                    <Text style={styles.topic}> QR </Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.cameraBtn, { opacity: pressed ? 0.5 : 1 }]}
                    onPress={() => navigation.navigate('CarouselCamera')}>
                    <Text style={styles.topic}> Carousel Camera </Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'stretch',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        color: 'black',
        fontSize: 45,
        fontWeight: '600'
    },
    cameraBtn: {
        width: '40%',
        height: '20%',
        borderWidth: 2,
        padding: 20,
        backgroundColor: '#273746',
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
    },
    topic: {
        fontSize: 25,
        textAlign: 'center'
    }
})