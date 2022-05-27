import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Pressable, FlatList, Dimensions } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { CloseModalHeader } from '../Components/CloseModalHeader';

export const CarouselCamera = () => {
    const { width, height } = Dimensions.get('screen')
    const [onFocus, setOnFocus] = useState(false)
    const [isTakenPhoto, setIsTakenPhoto] = useState(false)
    const [index, setIndex] = useState(0)
    const [viewPosition, setViewPosition] = useState(0)
    const cameraRef = useRef<any>();
    let flatlistRef = useRef<FlatList>(null)
    const DATA = [
        { id: "1", title: "A", },
        { id: "2", title: "B", },
        { id: "3", title: "C", },
        { id: "4", title: "D", },
        { id: "5", title: "E", },
        { id: "6", title: "F", },
        { id: "7", title: "G", },
        { id: "8", title: "A", },
        { id: "9", title: "B", },
        { id: "10", title: "C", },
        { id: "11", title: "D", },
        { id: "12", title: "E", },
        { id: "13", title: "F", },
        { id: "14", title: "G", },
    ];
    // const RenderItem = ({ item }: any) => {
    //     return (
    //         <Pressable onPress={takePicture} style={{ ...styles.takePicture, backgroundColor:'black' }}>
    //             <Text>{item.id}</Text>
    //         </Pressable>
    //     );
    // }

    const takePicture = async () => {
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options)
        }
        setIsTakenPhoto(true);
    };

    const reload = () => (
        setIsTakenPhoto(false)
    )

useEffect(()=> {
    flatlistRef.current?.scrollToIndex({
        index,
        animated: true,
        viewOffset: viewPosition === 0.5 || viewPosition === 1 ? 0 : 10,
        viewPosition: 0.5
    })
}, [index, viewPosition])

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
                    <Pressable onPress={() => reload()} style={styles.reload}>
                        <Text> {isTakenPhoto ? 're' : 'ph'}  </Text>
                    </Pressable>
                    <Text style={styles.footerText}>RIGHT FRONT DOOR</Text>
                </View>

            </RNCamera>
            {isTakenPhoto ?
                <View style={{ ...styles.takePicture, position: 'absolute', bottom: '15%', backgroundColor: '#3785F7' }}>
                    <Text>✓</Text>
                </View>
                :
                <FlatList
                    data={DATA}
                    renderItem={({ item, index: fIndex }) => {
                        return (
                            <Pressable onPress={()=> {
                                setIndex(fIndex)
                            }} style={{ ...styles.takePicture, backgroundColor: fIndex === index?  'grey' : 'black' }}>
                                <Text>{item.id}</Text>
                            </Pressable>
                        )
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ref={flatlistRef}
                    style={styles.carousel}
                    initialScrollIndex={index}

                />
            }
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
        borderRadius: 40,
        padding: 26,
        paddingHorizontal: 30,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        margin: 10,
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'black'
    },
    carousel: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        bottom: '15%',
    }
})