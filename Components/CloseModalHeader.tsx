import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import { closeIcon } from '../Assets/Icons';
import { useNavigation } from '@react-navigation/native';

type Props = {
    style: any
}

export const CloseModalHeader = (props: Props ) => {
    const navigation = useNavigation();
    return (
        <View style={props.style}>
            <Pressable onPress={() => navigation.goBack()}>
                <Image style={styles.closeIcon} resizeMode="contain" source={closeIcon} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 35,
        alignItems: 'flex-end',
        right: 10
    },
    closeIcon: {
        width: 40,
        height: 40,
    },
});
