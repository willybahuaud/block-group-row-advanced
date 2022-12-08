const { createHigherOrderComponent } = wp.compose
const { Fragment, useState } = wp.element
const { InspectorControls } = wp.blockEditor
const { __ } = wp.i18n;
import {
	__experimentalUnitControl as UnitControl,
	TextControl,
	Flex,
	FlexItem,
	FlexBlock,
} from '@wordpress/components'

const {
	PanelBody
} = wp.components

const enableOnBLocks = [
    'core/group'
]

/**
 * Permet d'ajouter un nouvel attribut
 * 
 * @param {*} settings 
 * @param {*} name 
 * @returns {*} attributes
 */
const setGroupRowAdvancedAttributes = ( settings, name ) => {
    // Do nothing if it's another block than our defined ones.
    if ( ! enableOnBLocks.includes( name ) ) {
        return settings
    }

    return Object.assign( {}, settings, {
        attributes: Object.assign( {}, settings.attributes, {
            layoutFlex: { type: 'object' },
        } ),
    } )
}
wp.hooks.addFilter(
    'blocks.registerBlockType',
    'wab/set-group-row-advanced',
    setGroupRowAdvancedAttributes
)

/**
 * Ajout du control
 */
const withGroupRowAdvanced = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {

    	if ( ! enableOnBLocks.includes( props.name ) ) {
            return (
                <BlockEdit { ...props } />
            );
        }

		const parentClientId = wp.data.select( 'core/block-editor' ).getBlockParents( props.clientId );
		const parentAttributes = wp.data.select('core/block-editor').getBlockAttributes( parentClientId.at(-1) );

		if ( ! ( parentClientId && parentAttributes?.layout?.type === 'flex') ) {
			return (
                <BlockEdit { ...props } />
            );
		}

        const { attributes, setAttributes } = props;
        const { layoutFlex } = attributes;

		const setLayout = (v) => {
			const l = Object.assign({},layoutFlex,{[v.key]:v.val})
			setAttributes({layoutFlex:l})
		}

		const units = [
			{ value: '%', label: '%', default: 0 },
			{ value: 'px', label: 'px', default: 0 },
			{ value: 'em', label: 'em', default: 0 },
			{ value: 'rem', label: 'rem', default: 0 },
		];


        return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Contrôle avancé de la mise en page' ) }
					>
						<Flex
						align="flex-start"
						>
							<FlexBlock>
								<TextControl 
									label={__('Grow')}
									onChange={ (v) => setLayout({val:v,key:"flexGrow"}) }
									value={ layoutFlex?.flexGrow }
									type="number"
									min={0}
									placeholder={1}
									style={{flexShrink:1}}
								/>
						</FlexBlock>
							<FlexBlock>
								<TextControl 
									label={__('Shrink')}
									onChange={ (v) => setLayout({val:v,key:"flexShrink"}) }
									value={ layoutFlex?.flexShrink }
									type="number"
									min={0}
									placeholder={1}
									style={{flexShrink:1}}
								/>
							</FlexBlock>
							<FlexBlock>
								<UnitControl 
									label={__('Flex-basis')}
									onChange={ (v) => setLayout({val:v,key:"flexBasis"}) }
									value={ layoutFlex?.flexBasis }
									units={units}
									placeholder={__('auto')}
									style={{width:"80px"}}
								/>
							</FlexBlock>
						</Flex>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
    };
}, 'withGroupRowAdvanced' );
wp.hooks.addFilter(
    'editor.BlockEdit',
    'wab/with-group-row-advanced',
    withGroupRowAdvanced
)

const withGroupRowAdvancedStyle = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		if ( ! enableOnBLocks.includes( props.name ) ) {
			return (
				<BlockListBlock { ...props } />
			)
		}

		const { attributes } = props
		if ( ( ! attributes.layoutFlex ) || Object.values(attributes.layoutFlex).every(x => x === null || x === '') ) {
			return (
				<BlockListBlock { ...props } />
			)
		}

		return (
			<BlockListBlock
				{ ...props }
				wrapperProps={{style: attributes.layoutFlex }}
			/>
		)
	}
}, 'withGroupRowAdvancedStyle' )
wp.hooks.addFilter(
	'editor.BlockListBlock',
	'wab/with-group-row-advanced-prop',
	withGroupRowAdvancedStyle
);

function applyGroupRowAdvancedStyle(extraProps, blockType, attributes) {
	if ( ! enableOnBLocks.includes( blockType.name ) ) {
		return extraProps
	}
	
	const { layoutFlex } = attributes;
	if ( ( ! layoutFlex ) || Object.values(layoutFlex).every(x => x === null || x === '') ) {
		return extraProps
	}

	Object.assign(extraProps, { style: Object.assign({}, extraProps?.style, layoutFlex) });

	return extraProps;
}
 
wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'wab/apply-group-row-advanced',
	applyGroupRowAdvancedStyle
)
