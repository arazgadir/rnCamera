import { NavigationContainer } from '@react-navigation/native'
import React, {FC} from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

interface Props {
    navigation: any
};

export const Home: FC<Props> = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.cameraBtn} onPress={() => navigation.navigate('Camera')}>
                <Text> Open Camera </Text>
            </Pressable>
            <Pressable style={styles.cameraBtn} onPress={() => navigation.navigate('Scanner')}>
                <Text> Open Scanner </Text>
            </Pressable>
            <Pressable style={styles.cameraBtn} onPress={() => navigation.navigate('QRcode')}>
                <Text> Open QR </Text>
            </Pressable>
            <Pressable style={styles.cameraBtn} onPress={() => navigation.navigate('CarouselCamera')}>
                <Text> Open Carousel Camera </Text>
            </Pressable>
            <Pressable style={styles.cameraBtn} onPress={() => navigation.navigate('PicToPdf')}>
                <Text> PDF </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraBtn: {
        borderWidth: 2,
        padding: 10,
        backgroundColor: 'grey',
        margin: 5
    }
})