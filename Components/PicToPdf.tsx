import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
// import RNImageToPdf from 'react-native-image-to-pdf';
import { image1, image2 } from '../Assets/Images'
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

	const getPdf = async () => {
		try {

			console.log('NOT YET')
			const docsDir = await PDFLib.getDocumentsDirectory();
			console.log('all done')
			const pdfPath = `${docsDir}/sample.pdf`;
			PDFDocument
				.create(pdfPath)
				.addPages(page2)
				.write()
				.then((path: any) => {
					console.log('PDF created at: ' + path);
				});
		}
		catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		getPdf
		setPdfFile(page2)
	}, [])
	return (
		<View style= {styles.container}>
			{pdfFile}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
