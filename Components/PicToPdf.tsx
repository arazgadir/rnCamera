import { Dimensions } from 'react-native'
// @ts-ignore
import RNImageToPdf from 'react-native-image-to-pdf';
import {image1, image2 } from '../Assets/Images'

export const PicToPdf = async () => {
    const { width, height } = Dimensions.get('screen')

	try {
		const options = {
			imagePaths:[image1, image2],
			name:'PDFName',
			maxSize: { 
				width: 900,
				height: Math.round(height / width * 900),
			},
			quality: .7, 
			targetPathRN: "Download/img-to-pdf/", 
		};
		const pdf = await RNImageToPdf.createPDFbyImages(options);
		console.log(pdf.filePath);
	} catch(e) {
		console.log(e);
	}
}
