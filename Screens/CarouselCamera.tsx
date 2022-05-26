import React, { useRef } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { CloseModalHeader } from '../Components/CloseModalHeader';


export const CarouselCamera = () => {
    const cameraRef = useRef<any>();

    const takePicture = async () => {
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options)
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.previewCam}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >
                <CloseModalHeader style={styles.headerCarouselCam} />

                <View style={styles.CarouslCamFooter}>
                    <Pressable style={styles.reload}>
                        <Text> ph </Text>
                    </Pressable>
                    <Text style={styles.footerText}>RIGHT FRONT DOOR</Text>
                </View>
            </RNCamera>

            <Pressable onPress={takePicture} style={{ ...styles.takePicture, backgroundColor: 'white' }}>
                <Text>✓</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    headerCarouselCam: {
        paddingVertical: 20,
        alignItems: 'flex-end',
        backgroundColor: 'black',
        opacity: 0.5

    },
    previewCam: {
        flex: 1,
        justifyContent: 'space-between',
    },
    CarouslCamFooter: {
        flexDirection: 'row',
        backgroundColor: 'black',
        opacity: 0.5,
    },
    reload: {
        backgroundColor: 'grey',
        flex: 0,
        borderRadius: 50 / 2,
        borderWidth: 2,
        borderColor: 'white',
        margin: 20,
        padding: 15
    },
    footerText: {
        alignSelf: 'center',
        marginLeft: 50
    },
    takePicture: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 40,
        padding: 26,
        paddingHorizontal: 30,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        zIndex: 1,
        bottom: '15%'
    }
})