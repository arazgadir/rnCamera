import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { CloseModalHeader } from '../Components/CloseModalHeader';

export const CarouselCamera = () => {
    const [onFocus, setOnFocus] = useState(false)
    const cameraRef = useRef<any>();
    let flatlistRef = useRef<any>()
    const DATA = [
        { id: "1", title: "A", },
        { id: "2",  title: "B", },
        { id: "3",  title: "C", },
        { id: "4", title: "D", },
        { id: "5", title: "E", },
        { id: "6", title: "F", },
        { id: "7", title: "G", },
      ];
    const RenderItem = ({item} : any) => {
        console.log
          return    (
                <Pressable  onPress={takePicture} style={{...styles.takePicture, backgroundColor: 'black'}}>
                    <Text>{item.id}</Text>
                </Pressable>
            );
    }
    
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
            <FlatList
                data={DATA}
                renderItem={({item})=> {
                    return <RenderItem item={item}/>
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={(ref) => {
                    flatlistRef.current = ref
                }}
                style={styles.carousel}
            />
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