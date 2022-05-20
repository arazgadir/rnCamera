import React, { useRef } from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { CloseModalHeader } from '../Components/CloseModalHeader';
import BarcodeMask from 'react-native-barcode-mask';

export const Scanner = () => {
    const cameraRef = useRef<any>();
    
    const OnBarcodeRead = (e: any) => {
        console.log(e)
        Alert.alert(e.data)
    }
    return (
        <View style={styles.container} >
            <CloseModalHeader style={styles.headerScan} />
            <RNCamera
                ref={cameraRef}
                style={styles.previewScan}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                onBarCodeRead={(e) => OnBarcodeRead(e)}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >
                <BarcodeMask width={350} height={300} showAnimatedLine={false} outerMaskOpacity={0.1} />
            </RNCamera>
            <View style={styles.scanFooter}>
                <Text> Place internal Code in center of the area </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000000',
    },
    headerScan: {
        paddingVertical: 10,
        alignItems: 'flex-end',
        right: 10
    },
    previewScan: {
        flex: 1,
    },
    scanFooter: {
        marginBottom: 40,
        alignItems: 'center'
    }
});
