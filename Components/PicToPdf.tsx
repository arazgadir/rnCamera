import React, { useEffect, useState } from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native'
// @ts-ignore
import RNImageToPdf from 'react-native-image-to-pdf';


export const PicToPdf = () => {
	const [picturePdf, setpicturePdf] = useState(null)
	// const photoPath = ['https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
	// 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'];

	const MyAsyncPDFFunction = async () => {
		try {
			const options = {
				imagePaths: ['../Assets/Images/car1.png', '../Assets/Images/car2.png'],
				name: 'PDFName',
			};
			const pdf = await RNImageToPdf.createPDFbyImages(options);
			setpicturePdf(pdf.filePath)
		} catch (e) {
			console.log('errrooooooooooooooooor--->>>>', e);
		}

	}

	useEffect(() => {
		MyAsyncPDFFunction()
	}, [])


	return (
		<View style={styles.container}>
				{picturePdf}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 25,
	},
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	}
});