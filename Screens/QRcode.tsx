import React, { useState, useRef, useCallback } from 'react'
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import { CloseModalHeader } from '../Components/CloseModalHeader'
import QRCode from 'react-native-qrcode-svg'
// @ts-ignore
import SignatureCapture from 'react-native-signature-capture';

export const QRcode = () => {
    const link = "http://awesome.link.qr"
    const signatureViewRef = useRef<any>();
    const [isManualSign, setIsManualSign] = useState(false)
    const [isSigned, setIsSigned] = useState(false)

    const addManuallySign = () => {
        if (isManualSign) {
            signatureViewRef.current.resetImage()
            setIsSigned(false)
        } else {
            setIsManualSign(true)
        }
    }

    const onSaveSign = () => {
        console.log('is SIGNED IN FUNCTION: ', isSigned)
        if(isSigned){
            signatureViewRef.current.saveImage()
            Alert.alert('Sign saved sucsessfully')
            setIsSigned(false)

        }
    };

    const onDragEvent = () => {
        setIsSigned(true)
    }

    const onSaveEvent = (result: any) => {
        console.log(result.encoded)
    } 

    return (
        <View style={styles.container}>

            <CloseModalHeader style={styles.qrcodeHeader} headerText='Driver' />
            <View style={isManualSign ? styles.manualSign : styles.qrSign}>
                {isManualSign ?
                    <SignatureCapture
                        ref={signatureViewRef}
                        style={styles.signature}
                        onSaveEvent={onSaveEvent}
                        onDragEvent={onDragEvent}
                        saveImageFileInExtStorage={false}
                        showNativeButtons={false}
                        backgroundColor={'#262626'}
                        strokeColor={'white'}
                        minStrokeWidth={4}
                        maxStrokeWidth={8}
                        viewMode={'portrait'}
                    />
                    :
                    <QRCode
                        value={link}
                        size={250}
                    />
                }

            </View>
            <View style={styles.buttonsQr}>
                <Pressable style={styles.AddManually} onPress={addManuallySign}>
                    <Text style={{ fontWeight: 'bold', color: isSigned ? 'white' : '#A6ACAF' }}> {isManualSign ? 'Retake' : 'Add Manually'} </Text>
                </Pressable>
                <Pressable style={styles.confirm} onPress={ onSaveSign}>
                    <Text style={{ fontWeight: 'bold', color: isSigned ? 'white' : '#A6ACAF' }}>Confirm</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: 'black',
    },
    qrcodeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15
    },
    qrSign: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '68%',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: 'white'
    },
    manualSign: {
        flex: 1,
        marginTop: 10,
    },
    buttonsQr: {
        alignItems: 'center',
    },
    AddManually: {
        borderWidth: 2,
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#404040',
    },
    confirm: {
        backgroundColor: '#3785F7',
        borderWidth: 2,
        padding: 15,
        margin: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    signature: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 10,
    },
})