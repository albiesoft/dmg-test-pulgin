import React, { FC } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { BlockSaveProps } from '@wordpress/blocks';
import metadata from "./block.json";

interface Attributes {
	title?: string;
	link?: string;
	postID?: string;
}

const Save: FC<BlockSaveProps<Attributes>> = ({ attributes }) => {
	return (
		<p { ...useBlockProps.save({
			className: 'dmg-read-more',
		}) }>
			{ __( 'Read More: ', metadata.textdomain ) } <a href={attributes.link}>{attributes.title}</a>
		</p>
	);
};

export default Save;
