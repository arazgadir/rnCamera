import React, { FC, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { closeIcon } from '../Assets/Icons';

interface Props {
    navigation: any
};

export const Camera: FC<Props> = ({ navigation }) => {
    const cameraRef = useRef<any>();
    const [takePic, setTakepic] = useState(false)
    const [countPic, setCountPic] = useState(0)
    const [isAddPicVisible, setIsAddPicVisible] = useState(false)

    const takePicture = async () => {
        if (cameraRef && !takePic) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options)
            console.log(data.uri);
        }
        setTakepic(true);
        setIsAddPicVisible(true)
        countPic == 1 && setCountPic(prev => prev + 1)

    };
    const handleAddPhoto = () => {
        !takePic || setTakepic(prev => !prev)
        countPic == 2 || !takePic || setCountPic(prev => prev + 1)
        countPic == 2 && setTakepic(false)
    }

    const handleReloadCam = () => {
        setTakepic(prev => !prev)
        setCountPic(0)
        setIsAddPicVisible(prev => !prev)
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.closeIcon} resizeMode="contain" source={closeIcon} />
                </Pressable>
            </View>
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />
            <View style={styles.camFooter}>
                <TouchableOpacity onPress={() => handleReloadCam()} style={styles.showPic}>
                    <Text>{takePic ? 're' : 'ph'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={takePicture} style={{ ...styles.capture, backgroundColor: takePic ? 'blue' : 'white' }}>
                    <Text>✓</Text>
                </TouchableOpacity>
                {isAddPicVisible ?
                    <TouchableOpacity onPress={() => handleAddPhoto()} style={styles.showPic}>
                        <Text> {isAddPicVisible ? countPic || '+' : '+'} </Text>
                    </TouchableOpacity> : <></>
                }
            </View>
            <View style={styles.docFooter}>
                <Pressable >
                    <Text > Bill of Lading </Text>
                </Pressable>
                <Pressable >
                    <Text> Other Document </Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    header: {
        paddingVertical: 35,
        alignItems: 'flex-end',
        right: 10
    },
    closeIcon: {
        width: 40,
        height: 40,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    camFooter: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    showPic: {
        flex: 0,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'black',
        borderRadius: 40,
        padding: 15,
        paddingHorizontal: 18,
        alignSelf: 'center',
        margin: 20,
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 40,
        padding: 25,
        paddingHorizontal: 30,
        alignSelf: 'center',
        margin: 20,

    },
    docFooter: {
        flexDirection: 'row',
        paddingBottom: 30,
        justifyContent: 'center'
    },

})