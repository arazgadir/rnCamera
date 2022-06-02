import React, { useEffect, useState } from 'react'
import { Dimensions, View, Text, StyleSheet, Image, ScrollView } from 'react-native'
// import RNImageToPdf from 'react-native-image-to-pdf';
// import Pdf from 'react-native-pdf';
// @ts-ignore
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

export const PicToPdf = ({ route }) => {
	const pic = route.params.params
	const [pdfFile, setPdfFile] = useState(null)

	const jpgPath = pic[0]
	const page2 = PDFPage
	.create()
	.setMediaBox(250, 250)
	.drawText('You can add JPG images too!')
	.drawImage(jpgPath, 'jpg', {
	   x: 5,
	   y: 125,
	   width: 200,
	   height: 100,
	})

const getPdf = async() => {
	const docsDir = await PDFLib.getDocumentsDirectory();
	const pdfPath = `${docsDir}/sample.pdf`;
	PDFDocument
	  .create(pdfPath)
	  .addPages(page1, page2)
	  .write() // Returns a promise that resolves with the PDF's path
	  .then(path => {
		console.log('PDF created at: ' + path);
	  });
}


	useEffect(() => {
		getPdf()
		setPdfFile(page2)
	}, [])

	return (
		<ScrollView style={styles.container}>
			<Image style={styles.pic} source={{ uri: pic[0] }} />
			<Image style={styles.pic} source={{ uri: pic[1] }} />
			<Text style={styles.text}> P D F </Text>
			<View>
				{pdfFile}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	pic: {
		flex: 1,

		height: 100,
		borderRadius: 10,
		margin: 5,
		borderWidth: 1,
	},
	text: {
		color: 'black',
		textAlign: 'center',
		marginVertical: 10,
		fontWeight: 'bold'
	}
})
