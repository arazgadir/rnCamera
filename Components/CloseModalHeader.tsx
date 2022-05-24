import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, Pressable, Image, Text } from 'react-native';
import { closeIcon } from '../Assets/Icons';
import { useNavigation } from '@react-navigation/native';

type Props = {
    style?: any
    headerText?: string
}

export const CloseModalHeader = (props: Props) => {
    const navigation = useNavigation();
    return (
        <View style={props.style}>
            {props.headerText &&
                <Text style={styles.headerText}>{props.headerText}</Text>
            }
            <Pressable onPress={() => navigation.goBack()}>
                <Image style={styles.closeIcon} resizeMode="contain" source={closeIcon} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    closeIcon: {
        width: 40,
        height: 40,
    },
    headerText: {
        color: 'white',
        fontSize: 34,
        fontWeight: '700'
    }
});
