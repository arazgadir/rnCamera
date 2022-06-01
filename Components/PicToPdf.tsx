import React, { useEffect, useState } from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native'
// @ts-ignore
import RNImageToPdf from 'react-native-image-to-pdf';
import Pdf from 'react-native-pdf';

export const PicToPdf = () => {
	const [picturePdf, setpicturePdf] = useState(null)

	const MyAsyncPDFFunction = async () => {
		try {
			const options = {
				imagePaths: ['/Assests/Images/car1.png', '/Assests/Images/car1.png'],
				name: 'PDFName',
			};
			const pdf = await RNImageToPdf.createPDFbyImages(options);
			setpicturePdf(pdf.filePath)
		} catch (e) {
			console.log('error--->>>>', e);
		}

	}

	useEffect(() => {
		MyAsyncPDFFunction()
	}, [])


	return (
		<View style={styles.container}>
		<Pdf
                    source={picturePdf}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onError={(error: any) => {
                        console.log(error);
                    }}
                    style={styles.pdf}/>
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