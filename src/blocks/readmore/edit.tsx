import React, { FC, useState } from 'react';
import { BlockEditProps } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ComboboxControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { WP_REST_API_Post as Post } from 'wp-types';

import metadata from "./block.json";
import './editor.scss';

interface Attributes {
	postID?: string;
	title?: string;
	link?: string;
}

const Edit: FC<BlockEditProps<Attributes>> = ({
	attributes,
	setAttributes
}) => {
	const [ selected, setSelected ] = useState<any>(attributes.postID);
	const [ search, setSearch] = useState<string>('');
	
	const blockProps = useBlockProps( {
		className: 'dmg-read-more',
	} );

	const { posts } = useSelect((select: any) => ({
		posts: select('core').getEntityRecords("postType", "post", {
			per_page: 10,
			order: "desc",
			order_by: "date",
			search,
		}) ?? [],
	}), [search]);

	const options = posts?.map((post: Post) => ({
		value: `${post.id}`,
		label: post.title.rendered,
	}));

	const handleOnChange = (value: string | null) => {
		if (value) {
			const post = posts.find((post: Post) => post.id == parseInt(value, 10));
			setAttributes({
				title: post.title.rendered,
				link: post.link,
				postID: `${value}`,
			});
	
			setSelected(value);
		}
	};

	return (
		<>
			<p { ...blockProps }>
				{ __( 'Read More: ', metadata.textdomain ) } <a href={ attributes.link }>{ attributes.title }</a>
			</p>
			<InspectorControls>
				<PanelBody title={ __( "DMG Read More", metadata.textdomain ) }>
					<ComboboxControl
						label="Select Post"
            value={ selected }
            onChange={ handleOnChange }
            options={  options }
            onFilterValueChange={ ( inputValue ) => setSearch(inputValue) }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default Edit;
