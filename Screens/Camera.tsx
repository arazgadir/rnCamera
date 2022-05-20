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
    const [isAddPicAllowed, setIsAddPicAllowed] = useState(true)
    const [isAddPicVisible, setIsAddPicVisible] = useState(false)
    const [isOtherDoc, setIsOtherDoc] = useState(false)
    const [pic, setPic] = useState([])

    const takePicture = async () => {
        if (cameraRef && !takePic) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options)
            pic.push(data.uri)
        }
        else if (takePic && !isAddPicAllowed) {
            //navigate to Estest Express Lines Screen
            navigation.navigate('Home') //for example
        }
        setTakepic(true);
        setIsAddPicVisible(true)
        countPic == 1 && setCountPic(prev => prev + 1)
    };
    const handleAddPhoto = () => {
        if (countPic == 2) {
            setTakepic(true)
            setIsAddPicAllowed(false)
        }
        else {
            !takePic || setTakepic(prev => !prev)
            countPic == 2 || !takePic || setCountPic(prev => prev + 1)
            countPic == 2 && setTakepic(false)
        }
    }

    const handleReloadCam = () => {
        if (!takePic) {
            navigation.goBack() //for exaple 
            //go to Gallery 
        } else {
            setTakepic(prev => !prev)
            setCountPic(0)
            setIsAddPicVisible(prev => !prev)
            setIsAddPicAllowed(true)
            setPic([])
        }
    }

    const handleDeletePic = (item: any) => {
        if(pic.length == 1){
            setPic([]) 
            setIsAddPicAllowed(true)
            setIsAddPicVisible(false)
            setCountPic(0)
        }else{
            pic.splice(pic.indexOf(item),1)
        }
        setTakepic(false)
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
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
            {!isAddPicAllowed ?
                <View style={styles.picContainer}>
                    <View >
                        <Image style={styles.pic} source={{ uri: pic[0] }} />
                        <Pressable onPress={() => handleDeletePic(pic[0])} style={styles.delPic}>
                            <Text>x</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Image style={styles.pic} source={{ uri: pic[1] }} />
                        <Pressable onPress={() =>  handleDeletePic(pic[1]) } style={styles.delPic}>
                            <Text>x</Text>
                        </Pressable>
                    </View>
                </View>
                : <></>
            }
            <View style={styles.camFooter}>
                <Pressable onPress={() => handleReloadCam()} style={styles.showPic}>
                    <Text>{takePic ? 're' : 'ph'}</Text>
                </Pressable>
                <Pressable onPress={takePicture} style={{ ...styles.capture, backgroundColor: takePic ? 'blue' : 'white' }}>
                    <Text>✓</Text>
                </Pressable>
                {isAddPicVisible ?
                    <Pressable onPress={() => handleAddPhoto()} style={styles.showPic}>
                        <Text> {isAddPicAllowed ? countPic || '+' : 'x'} </Text>
                    </Pressable> : <></>
                }
            </View>
            <View style={styles.docFooter}>
                <Pressable onPress={() => setIsOtherDoc(false)} style={isOtherDoc ? null : styles.docTypeChoosen}>
                    <Text style={{ color: isOtherDoc ? 'white' : 'black', }} > Bill of Lading </Text>
                </Pressable>
                <Pressable onPress={() => setIsOtherDoc(true)} style={isOtherDoc ? styles.docTypeChoosen : null} >
                    <Text style={{ color: isOtherDoc ? 'black' : 'white' }} > Other Document </Text>
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
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey ',
        alignContent: 'space-around'
    },
    docTypeChoosen: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 20
    },
    picContainer: {
        position: 'absolute',
        left: 0,
        right: 40,
        bottom: 140,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    pic: {
        height: 60,
        width: 60,
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,
        overflow: 'hidden',
    },
    delPic: {
        position: 'absolute',
        right: 10,
        top: 5,
    }
})