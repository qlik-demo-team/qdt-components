declare module "qdtNova" {
    function _default(supernova: any): (Component: any, options: any) => () => {
        component(): void;
    };
    export default _default;
}
declare module "components/QdtModal/QdtModalStyles" {
    export default styles;
    function styles(theme: any): {
        modalContainer: {
            position: string;
            width: string;
            maxWidth: number;
            backgroundColor: any;
            border: string;
            boxShadow: any;
            padding: number;
            top: string;
            left: string;
            transform: string;
        };
        modalHeader: {
            padding: number;
            fontSize: string;
            fontWeight: number;
            backgroundColor: any;
            width: string;
            position: string;
        };
        modalBody: {
            padding: number;
            width: string;
            position: string;
        };
        modalFooter: {
            padding: number;
            borderTop: string;
            backgroundColor: any;
            textAlign: string;
            position: string;
            width: string;
        };
    };
}
declare module "components/QdtModal/QdtModal" {
    export default QdtModal;
    function QdtModal({ open, header, body, footer, handleClose, }: {
        open: any;
        header: any;
        body: any;
        footer: any;
        handleClose: any;
    }): JSX.Element;
    namespace QdtModal {
        export namespace propTypes {
            export const open: PropTypes.Validator<boolean>;
            export const handleClose: PropTypes.Requireable<(...args: any[]) => any>;
            export const header: PropTypes.Requireable<string>;
            export const body: PropTypes.Requireable<string>;
            export const footer: PropTypes.Requireable<PropTypes.ReactElementLike>;
        }
        export namespace defaultProps {
            const handleClose_1: null;
            export { handleClose_1 as handleClose };
            const header_1: null;
            export { header_1 as header };
            const body_1: null;
            export { body_1 as body };
            const footer_1: null;
            export { footer_1 as footer };
        }
    }
    import PropTypes from "prop-types";
}
declare module "utils/ConnectionLost" {
    function _default({ refreshUrl, timeoutMessage }: {
        refreshUrl: any;
        timeoutMessage: any;
    }): void;
    export default _default;
}
declare module "qdtEnigma" {
    export default qdtEnigma;
    function qdtEnigma(config: any): Promise<any>;
}
declare module "qdtCapabilityApp" {
    export default qApp;
    function qApp(config: any): Promise<any>;
}
declare module "hooks/useSessionObject" {
    export default useSessionObject;
    function useSessionObject({ app, properties: propertiesProp, onLayoutChange }: {
        app: any;
        properties: any;
        onLayoutChange: any;
    }): {
        model: null;
        layout: null;
    };
}
declare module "components/QdtComponent/QdtComponent" {
    export default QdtComponent;
    const QdtComponent: React.ForwardRefExoticComponent<React.RefAttributes<any>>;
    import React from "react";
}
declare module "components/QdtExtension/QdtExtension" {
    export default QdtExtension;
    const QdtExtension: React.ForwardRefExoticComponent<React.RefAttributes<any>>;
    import React from "react";
}
declare module "qdtCompose" {
    function _default({ element, theme: themeProp, component: componentProp, options: optionsProp, app: appProp, model: modelProp, layout: layoutProp, properties: propertiesProp, loading: loadingProp, onLayoutChange: onLayoutChangeProp }: {
        element: any;
        theme?: any;
        component: any;
        options?: any;
        app: any;
        model?: any;
        layout?: any;
        properties?: any;
        loading?: any;
        onLayoutChange?: any;
    }): void;
    export default _default;
  }
declare module "qdtCompose2" {
    function _default({ element, theme: themeProp, component: componentProp, options: optionsProp, app: appProp, model: modelProp, layout: layoutProp, properties: propertiesProp, loading: loadingProp, onLayoutChange: onLayoutChangeProp, }: {
        element: any;
        theme: any;
        component: any;
        options: any;
        app: any;
        model: any;
        layout: any;
        properties: any;
        loading: any;
        onLayoutChange: any;
    }): {
        element: any;
        theme: import("@material-ui/core").Theme;
        update: ({ theme: updatedThemeProp, component: updatedComponentProp, options: updatedOptionsProp, app: updatedAppProp, properties: updatedPropertiesProp, loading: updatedLoadingProp, onLayoutChange: updatedOnLayoutChangeProp, }: {
            theme: any;
            component: any;
            options: any;
            app: any;
            properties: any;
            loading: any;
            onLayoutChange: any;
        }) => void;
        clear: () => void;
        destroy: () => void;
        componentRef: React.RefObject<any>;
        modelRef: React.RefObject<any>;
        layoutRef: React.RefObject<any>;
    };
    export default _default;
    import React from "react";
}
declare module "hooks/useThree" {
    export default useThree;
    function useThree({ layout, options }: {
        layout: any;
        options: any;
    }): {
        scene: any;
        layout: any;
        createBar: ({ posx, posz, posy, width, height, depth, order, maxBarΝumberFromData, color, }: {
            posx?: number | undefined;
            posz?: number | undefined;
            posy?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
            depth?: number | undefined;
            order?: number | undefined;
            maxBarΝumberFromData?: number | undefined;
            color?: number | undefined;
        }) => Promise<any>;
        minimizeBars: () => void;
        raiseBars: () => void;
        renderScene: (mapboxgl: any, matrix: any) => void;
        createGroundPlane: () => void;
        finalRender: () => void;
    };
}
declare module "components/QdtButton/QdtButton" {
    export default QdtButton;
    function QdtButton({ app, options: optionsProp, }: {
        app: any;
        options: any;
    }): JSX.Element;
    namespace QdtButton {
        export namespace propTypes {
            export const app: PropTypes.Validator<object>;
            export const options: PropTypes.Requireable<object>;
        }
        export namespace defaultProps {
            const options_1: {};
            export { options_1 as options };
        }
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtKpi/QdtKpi" {
    export default QdtKpi;
    function QdtKpi({ layout, options: optionsProp }: {
        layout: any;
        options: any;
    }): JSX.Element;
    namespace QdtKpi {
        export namespace propTypes {
            export const layout: PropTypes.Requireable<object>;
            export const options: PropTypes.Requireable<object>;
        }
        export namespace defaultProps {
            const layout_1: null;
            export { layout_1 as layout };
            const options_1: {};
            export { options_1 as options };
        }
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtSelect/QdtSelect" {
    export default QdtSelect;
    function QdtSelect({ layout, model, options: optionsProp }: {
        layout: any;
        model: any;
        options: any;
    }): JSX.Element;
    namespace QdtSelect {
        export namespace propTypes {
            export const layout: PropTypes.Requireable<object>;
            export const model: PropTypes.Requireable<object>;
            export const options: PropTypes.Requireable<object>;
        }
        export namespace defaultProps {
            const layout_1: null;
            export { layout_1 as layout };
            const model_1: null;
            export { model_1 as model };
            const options_1: {};
            export { options_1 as options };
        }
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtSelect/QdtSelectSimple" {
    export default QdtSelect;
    function QdtSelect({ layout, model, options: optionsProp }: {
        layout: any;
        model: any;
        options: any;
    }): JSX.Element;
    namespace QdtSelect {
        export namespace propTypes {
            export const layout: PropTypes.Requireable<object>;
            export const model: PropTypes.Requireable<object>;
            export const options: PropTypes.Requireable<object>;
        }
        export namespace defaultProps {
            const layout_1: null;
            export { layout_1 as layout };
            const model_1: null;
            export { model_1 as model };
            const options_1: {};
            export { options_1 as options };
        }
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtList/QdtList" {
    export default QdtList;
    function QdtList({ layout, model, options: optionsProp }: {
        layout: any;
        model: any;
        options: any;
    }): JSX.Element;
    namespace QdtList {
        export namespace propTypes {
            export const layout: PropTypes.Requireable<object>;
            export const model: PropTypes.Requireable<object>;
            export const options: PropTypes.Requireable<object>;
        }
        export namespace defaultProps {
            const layout_1: null;
            export { layout_1 as layout };
            const model_1: null;
            export { model_1 as model };
            const options_1: {};
            export { options_1 as options };
        }
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtTable/QdtTable" {
    export default QdtTable;
    function QdtTable({ layout, model, options: optionsProp }: {
        layout: any;
        model: any;
        options: any;
    }): JSX.Element;
    namespace QdtTable {
        export namespace propTypes {
            export const layout: PropTypes.Requireable<object>;
            export const model: PropTypes.Requireable<object>;
            export const options: PropTypes.Requireable<object>;
        }
        export namespace defaultProps {
            const layout_1: null;
            export { layout_1 as layout };
            const model_1: null;
            export { model_1 as model };
            const options_1: {};
            export { options_1 as options };
        }
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtSequencer/QdtSequencer" {
    export default QdtSequencer;
    function QdtSequencer({ layout, model, options: optionsProp }: {
        layout: any;
        model: any;
        options: any;
    }): JSX.Element;
    namespace QdtSequencer {
        export namespace propTypes {
            export const layout: PropTypes.Requireable<object>;
            export const model: PropTypes.Requireable<object>;
            export const options: PropTypes.Requireable<object>;
        }
        export namespace defaultProps {
            const layout_1: null;
            export { layout_1 as layout };
            const model_1: null;
            export { model_1 as model };
            const options_1: {};
            export { options_1 as options };
        }
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtSlider/QdtSlider" {
    export default QdtSlider;
    function QdtSlider({ layout, model, options: optionsProp }: {
        layout: any;
        model: any;
        options: any;
    }): JSX.Element;
    namespace QdtSlider {
        export namespace propTypes {
            export const layout: PropTypes.Requireable<object>;
            export const model: PropTypes.Requireable<object>;
            export const options: PropTypes.Requireable<object>;
        }
        export namespace defaultProps {
            const layout_1: null;
            export { layout_1 as layout };
            const model_1: null;
            export { model_1 as model };
            const options_1: {};
            export { options_1 as options };
        }
    }
    import PropTypes from "prop-types";
}
declare module "styles/index" {
    export default theme;
    namespace theme {
        export { palette };
        export const primary: string;
        export const primaryLight: string;
        export const secondary: string;
        export const secondaryLight: string;
        export const tertiary: string;
        export const tertiaryLight: string;
        export const quaternary: {};
        export const quinary: {};
        export const senary: {};
    }
    const palette: string[];
}
declare module "components/QdtMapbox/QdtMapBox" {
    export default QdtMapBox;
    function QdtMapBox({ layout, model, options: optionsProp }: {
        layout: any;
        model: any;
        options: any;
    }): JSX.Element;
    namespace QdtMapBox {
        export namespace propTypes {
            export const layout: PropTypes.Requireable<object>;
            export const model: PropTypes.Requireable<object>;
            export const options: PropTypes.Requireable<object>;
        }
        export namespace defaultProps {
            const layout_1: null;
            export { layout_1 as layout };
            const model_1: null;
            export { model_1 as model };
            const options_1: {};
            export { options_1 as options };
        }
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtSelections/QdtSelectionsStyles" {
    export default useStyles;
    const useStyles: (props?: any) => Record<"icon" | "selected" | "container" | "field" | "menuList" | "primaryGrid" | "buttonGroup" | "selectedItemButton" | "linearProgressRoot" | "linearProgressBar", string>;
}
declare module "components/QdtSelections/QdtPopperContents" {
    export default QdtSelectionsPopper;
    function QdtSelectionsPopper({ open, qField, app }: {
        open: any;
        qField: any;
        app: any;
    }): JSX.Element;
    namespace QdtSelectionsPopper {
        export namespace propTypes {
            export const open: PropTypes.Validator<boolean>;
            export const app: PropTypes.Validator<object>;
            export const qField: PropTypes.Requireable<string>;
        }
        export namespace defaultProps {
            const qField_1: null;
            export { qField_1 as qField };
        }
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtPopper/QdtPopperStyles" {
    export default useStyles;
    const useStyles: (props?: any) => Record<"popper" | "popperPaper", string>;
}
declare module "components/QdtPopper/QdtPopper" {
    export default QdtPopper;
    function QdtPopper({ open, anchorEl, contents, onCallback, }: {
        open: any;
        anchorEl: any;
        contents: any;
        onCallback: any;
    }): JSX.Element;
    namespace QdtPopper {
        export namespace propTypes {
            export const open: PropTypes.Validator<boolean>;
            export const anchorEl: PropTypes.Validator<object>;
            export const contents: PropTypes.Requireable<(...args: any[]) => any>;
            export const onCallback: PropTypes.Requireable<(...args: any[]) => any>;
        }
        export namespace defaultProps {
            const onCallback_1: null;
            export { onCallback_1 as onCallback };
            const contents_1: null;
            export { contents_1 as contents };
        }
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtSelections/QdtSelections" {
    export default QdtSelections;
    function QdtSelections({ layout, app }: {
        layout: any;
        app: any;
    }): JSX.Element;
    namespace QdtSelections {
        export namespace propTypes {
            export const layout: PropTypes.Validator<object>;
            export const app: PropTypes.Validator<object>;
        }
        export const defaultProps: {};
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtSearch/QdtPopperContents" {
    export default QdtPopperContents;
    function QdtPopperContents({ open, layout, model, options, handleClose, }: {
        open: any;
        layout: any;
        model: any;
        options: any;
        handleClose: any;
    }): JSX.Element;
    namespace QdtPopperContents {
        export namespace propTypes {
            export const open: PropTypes.Validator<boolean>;
            export const layout: PropTypes.Validator<object>;
            export const model: PropTypes.Validator<object>;
            export const options: PropTypes.Validator<object>;
            export const handleClose: PropTypes.Validator<(...args: any[]) => any>;
        }
        export const defaultProps: {};
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtSearch/QdtSearchStyles" {
    export default styles;
    namespace styles {
        export namespace alignMiddle {
            export const display: string;
            export const alignItems: string;
        }
    }
}
declare module "components/QdtSearch/QdtSearch" {
    export default QdtSearch;
    function QdtSearch({ layout, model, options: optionsProp }: {
        layout: any;
        model: any;
        options: any;
    }): JSX.Element;
    namespace QdtSearch {
        export namespace propTypes {
            export const layout: PropTypes.Requireable<object>;
            export const model: PropTypes.Requireable<object>;
            export const options: PropTypes.Requireable<object>;
        }
        export namespace defaultProps {
            const layout_1: null;
            export { layout_1 as layout };
            const model_1: null;
            export { model_1 as model };
            const options_1: {};
            export { options_1 as options };
        }
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtThree/QdtThree" {
    export default QdtThree;
    function QdtThree({ layout }: {
        layout: any;
    }): JSX.Element;
    namespace QdtThree {
        export namespace propTypes {
            export const layout: PropTypes.Requireable<object>;
        }
        export namespace defaultProps {
            const layout_1: null;
            export { layout_1 as layout };
        }
    }
    import PropTypes from "prop-types";
}
declare module "utils/merge" {
    export default merge;
    function merge(x: any, y: any): any;
    namespace merge {
        export function all(arr: any): object;
    }
}
declare module "components/QdtModal/QdtSelectionModal" {
    export default QdtSelectionModal;
    function QdtSelectionModal({ isOpen, onCancelSelections, onConfirmSelections, }: {
        isOpen: any;
        onCancelSelections: any;
        onConfirmSelections: any;
    }): JSX.Element;
    namespace QdtSelectionModal {
        export namespace propTypes {
            export const isOpen: PropTypes.Validator<boolean>;
            export const onCancelSelections: PropTypes.Validator<(...args: any[]) => any>;
            export const onConfirmSelections: PropTypes.Validator<(...args: any[]) => any>;
        }
        export const defaultProps: {};
    }
    import PropTypes from "prop-types";
}
declare module "components/QdtPicasso/components/domPointLabel" {
    var _default: {
        require: string[];
        renderer: string;
        defaultSettings: {
            settings: {};
        };
        beforeRender(options: any): void;
        generatePoints(data: any): any;
        render(h: any, { data }: {
            data: any;
        }): any;
    };
    export default _default;
}
declare module "components/QdtPicasso/components/domPointImage" {
    var _default: {
        require: string[];
        renderer: string;
        defaultSettings: {
            settings: {};
        };
        beforeRender(options: any): void;
        generatePoints(data: any): any;
        render(h: any, { data }: {
            data: any;
        }): any;
    };
    export default _default;
}
declare module "components/QdtPicasso/components/treemap" {
    var _default: {
        require: string[];
        defaultSettings: {
            settings: {};
            data: {};
        };
        render({ data }: {
            data: any;
        }): any;
    };
    export default _default;
}
declare module "components/QdtPicasso/QdtPicasso" {
    export default QdtPicasso;
    const QdtPicasso: React.ForwardRefExoticComponent<React.RefAttributes<any>>;
    import React from "react";
}
declare module "components/QdtPicasso/settings/components/axis" {
    export default axis;
    function axis({ theme: themeProp, properties: propertiesProp, scale, formatter, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
        scale?: string | undefined;
        formatter?: any;
    }): any;
}
declare module "components/QdtPicasso/settings/components/box" {
    export default box;
    function box({ theme: themeProp, properties: propertiesProp, orientation, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
        orientation?: string | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/components/point" {
    export default point;
    function point({ theme: themeProp, properties: propertiesProp, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/components/lineArea" {
    export default lineArea;
    function lineArea({ theme: themeProp, properties: propertiesProp, showLine, showArea, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
        showLine?: boolean | undefined;
        showArea?: boolean | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/components/grid" {
    export default grid;
    function grid({ theme: themeProp, properties: propertiesProp, x, y, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
        x?: boolean | undefined;
        y?: boolean | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/components/labels" {
    export default labels;
    function labels({ theme: themeProp, properties: propertiesProp, type, component, orientation, format: formatSpec, labels: labelsProp, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
        type?: string | undefined;
        component?: string | undefined;
        orientation?: string | undefined;
        format?: string | undefined;
        labels?: any;
    }): any;
}
declare module "components/QdtPicasso/settings/components/range" {
    export default range;
    function range({ theme: themeProp, properties: propertiesProp, scale, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
        scale?: string | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/components/tooltip" {
    export default tooltip;
    function tooltip({ theme: themeProp, properties: propertiesProp, format: formatSpec, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
        format?: string | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/components/legend" {
    export default legend;
    function legend({ theme: themeProp, properties: propertiesProp, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/components/index" {
    namespace _default {
        export { axis };
        export { box };
        export { point };
        export { lineArea };
        export { grid };
        export { labels };
        export { range };
        export { tooltip };
        export { legend };
    }
    export default _default;
    import axis from "components/QdtPicasso/settings/components/axis";
    import box from "components/QdtPicasso/settings/components/box";
    import point from "components/QdtPicasso/settings/components/point";
    import lineArea from "components/QdtPicasso/settings/components/lineArea";
    import grid from "components/QdtPicasso/settings/components/grid";
    import labels from "components/QdtPicasso/settings/components/labels";
    import range from "components/QdtPicasso/settings/components/range";
    import tooltip from "components/QdtPicasso/settings/components/tooltip";
    import legend from "components/QdtPicasso/settings/components/legend";
}
declare module "components/QdtViz/QdtViz" {
    function _default({ element, app, options }: {
        element: any;
        app: any;
        options: any;
    }): void;
    export default _default;
}
declare module "components/QdtPicasso/settings/interactions/rangePan" {
    export default rangePan;
    function rangePan({ properties: propertiesProp, scale, }?: {
        properties?: {} | undefined;
        scale?: string | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/interactions/tooltipHover" {
    export default tooltipHover;
    function tooltipHover({ properties: propertiesProp, }?: {
        properties?: {} | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/utils/formatters" {
    export {};
}
declare module "components/QdtPicasso/settings/barchart" {
    export default BarChart;
    function BarChart({ theme: themeProp, properties: propertiesProp, orientation, type, xAxis: xAxisProp, yAxis: yAxisProp, grid: gridProp, box: boxProp, labels: labelsProp, legend: legendProp, range: rangeProp, tooltip: tooltipProp, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
        orientation?: string | undefined;
        type?: string | undefined;
        xAxis?: {} | undefined;
        yAxis?: {} | undefined;
        grid?: {} | undefined;
        box?: {} | undefined;
        labels?: {} | undefined;
        legend?: {} | undefined;
        range?: {} | undefined;
        tooltip?: {} | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/lineChart" {
    export default lineChart;
    function lineChart({ theme: themeProp, properties: propertiesProp, type, showArea, xAxis: xAxisProp, yAxis: yAxisProp, grid: gridProp, lineArea: lineAreaProp, point: pointProp, range: rangeProp, tooltip: tooltipProp, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
        type?: string | undefined;
        showArea?: boolean | undefined;
        xAxis?: {} | undefined;
        yAxis?: {} | undefined;
        grid?: {} | undefined;
        lineArea?: {} | undefined;
        point?: {} | undefined;
        range?: {} | undefined;
        tooltip?: {} | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/components/pie" {
    export default pie;
    function pie({ theme: themeProp, properties: propertiesProp, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/pieChart" {
    export default pieChart;
    function pieChart(): {
        scales: {
            c: {
                data: {
                    extract: {
                        field: string;
                    };
                };
                type: string;
            };
        };
        components: any[];
        interactions: any[];
    };
}
declare module "components/QdtPicasso/settings/components/domPointLabel" {
    export default domPointLabel;
    function domPointLabel({ theme: themeProp, properties: propertiesProp, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/interactions/legendClick" {
    export default legendClick;
    function legendClick({ properties: propertiesProp, }?: {
        properties?: {} | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/scatterPlot" {
    export default ScatterPlot;
    function ScatterPlot({ theme: themeProp, properties: propertiesProp, point: pointProp, pointImage: pointImageProp, labels: labelsProp, legend: legendProp, tooltip: tooltipProp, range: rangeProp, xAxis: xAxisProp, yAxis: yAxisProp, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
        point?: {} | undefined;
        pointImage?: any;
        labels?: {} | undefined;
        legend?: {} | undefined;
        tooltip?: {} | undefined;
        range?: {} | undefined;
        xAxis?: {} | undefined;
        yAxis?: {} | undefined;
    }): any;
}
declare module "components/QdtPicasso/settings/merimekko" {
    export default MerimekkoChart;
    function MerimekkoChart({ theme: themeProp, }?: {
        theme?: {} | undefined;
    }): {
        collections: ({
            key: string;
            data: {
                extract: {
                    field: string;
                    props: {
                        series: {
                            field: string;
                        };
                        metric: {
                            field: string;
                            reduce: string;
                        };
                        end: {
                            field: string;
                            reduce: string;
                        };
                    };
                    trackBy?: undefined;
                    reduce?: undefined;
                };
                stack: {
                    stackKey: (d: any) => any;
                    value: (d: any) => any;
                    offset: string;
                };
            };
        } | {
            key: string;
            data: {
                extract: {
                    field: string;
                    trackBy: (d: any) => any;
                    reduce: string;
                    props: {
                        series: {
                            field: string;
                        };
                        metric: {
                            field: string;
                            reduce?: undefined;
                        };
                        end: {
                            field: string;
                            reduce?: undefined;
                        };
                    };
                };
                stack: {
                    stackKey: () => number;
                    value: (d: any) => any;
                    offset: string;
                };
            };
        })[];
        scales: {
            y: {
                data: {
                    collection: {
                        key: string;
                    };
                };
                invert: boolean;
            };
            b: {
                data: {
                    collection: {
                        key: string;
                    };
                };
                type: string;
            };
            x: {
                data: {
                    collection: {
                        key: string;
                    };
                };
                max: number;
            };
            c: {
                data: {
                    extract: {
                        field: string;
                    };
                };
                range: any;
                type: string;
            };
        };
        components: any[];
        interactions: any[];
    };
}
declare module "components/QdtPicasso/settings/treemap" {
    export default Treemap;
    function Treemap({ theme: themeProp, properties: propertiesProp, tooltip: tooltipProp, }?: {
        theme?: {} | undefined;
        properties?: {} | undefined;
        tooltip?: {} | undefined;
    }): any;
}
declare module "qdt-components" {
    // export * from "qdtNova";
    // export * from "qdtEnigma";
    // export * from "qdtCapabilityApp";
    // export * from "qdtCompose";
    // export * from "hooks/useThree";
    // export * from "components/QdtButton/QdtButton";
    // export * from "components/QdtKpi/QdtKpi";
    // export * from "components/QdtSelect/QdtSelect";
    // export * from "components/QdtSelect/QdtSelectSimple";
    // export * from "components/QdtList/QdtList";
    // export * from "components/QdtTable/QdtTable";
    // export * from "components/QdtSequencer/QdtSequencer";
    // export * from "components/QdtSlider/QdtSlider";
    // export * from "components/QdtMapbox/QdtMapBox";
    // export * from "components/QdtSelections/QdtSelections";
    // export * from "components/QdtSearch/QdtSearch";
    // export * from "components/QdtThree/QdtThree";
    // export * from "components/QdtPicasso/QdtPicasso";
    // // export * from "components/QdtPicasso/settings/components";
    // export * from "components/QdtViz/QdtViz";
    // export * from "hooks/useSessionObject";
    // export * from "components/QdtPicasso/settings/barchart";
    // export * from "components/QdtPicasso/settings/lineChart";
    // export * from "components/QdtPicasso/settings/pieChart";
    // export * from "components/QdtPicasso/settings/scatterPlot";
    // export * from "components/QdtPicasso/settings/merimekko";
    // export * from "components/QdtPicasso/settings/treemap";
    
    export { default as qdtNova } from "qdtNova";
    export { default as qdtEnigma } from "qdtEnigma";
    export { default as qdtCapabilityApp } from "qdtCapabilityApp";
    export { default as qdtCompose } from "qdtCompose";
    export { default as useThree } from "hooks/useThree";
    export { default as QdtButton } from "components/QdtButton/QdtButton";
    export { default as QdtKpi } from "components/QdtKpi/QdtKpi";
    export { default as QdtSelect } from "components/QdtSelect/QdtSelect";
    export { default as QdtSelectSimple } from "components/QdtSelect/QdtSelectSimple";
    export { default as QdtList } from "components/QdtList/QdtList";
    export { default as QdtTable } from "components/QdtTable/QdtTable";
    export { default as QdtSequencer } from "components/QdtSequencer/QdtSequencer";
    export { default as QdtSlider } from "components/QdtSlider/QdtSlider";
    export { default as QdtMapBox } from "components/QdtMapbox/QdtMapBox";
    export { default as QdtSelections } from "components/QdtSelections/QdtSelections";
    export { default as QdtSearch } from "components/QdtSearch/QdtSearch";
    export { default as QdtThree } from "components/QdtThree/QdtThree";
    export { default as QdtPicasso } from "components/QdtPicasso/QdtPicasso";
    export { default as QdtPicassoComponents } from "components/QdtPicasso/settings/components/index";
    export { default as QdtViz } from "components/QdtViz/QdtViz";
    export { default as useSessionObject } from "hooks/useSessionObject";
    export { default as useBarChartSettings } from "components/QdtPicasso/settings/barchart";
    export { default as useLineChartSettings } from "components/QdtPicasso/settings/lineChart";
    export { default as usePieChartSettings } from "components/QdtPicasso/settings/pieChart";
    export { default as useScatterPlotSettings } from "components/QdtPicasso/settings/scatterPlot";
    export { default as useMerimekkoSettings } from "components/QdtPicasso/settings/merimekko";
    export { default as useTreemapSettings } from "components/QdtPicasso/settings/treemap";

    // export { default as qdtNova } from "./qdtNova";
    // export { default as qdtEnigma } from "./qdtEnigma";
    // export { default as qdtCapabilityApp } from "./qdtCapabilityApp";
    // export { default as qdtCompose } from "./qdtCompose";
    // export { default as useThree } from "./hooks/useThree";
    // export { default as QdtButton } from "./components/QdtButton/QdtButton";
    // export { default as QdtKpi } from "./components/QdtKpi/QdtKpi";
    // export { default as QdtSelect } from "./components/QdtSelect/QdtSelect";
    // export { default as QdtSelectSimple } from "./components/QdtSelect/QdtSelectSimple";
    // export { default as QdtList } from "./components/QdtList/QdtList";
    // export { default as QdtTable } from "./components/QdtTable/QdtTable";
    // export { default as QdtSequencer } from "./components/QdtSequencer/QdtSequencer";
    // export { default as QdtSlider } from "./components/QdtSlider/QdtSlider";
    // export { default as QdtMapBox } from "./components/QdtMapbox/QdtMapBox";
    // export { default as QdtSelections } from "./components/QdtSelections/QdtSelections";
    // export { default as QdtSearch } from "./components/QdtSearch/QdtSearch";
    // export { default as QdtThree } from "./components/QdtThree/QdtThree";
    // export { default as QdtPicasso } from "./components/QdtPicasso/QdtPicasso";
    // export { default as QdtPicassoComponents } from "./components/QdtPicasso/settings/components";
    // export { default as QdtViz } from "./components/QdtViz/QdtViz";
    // export { default as useSessionObject } from "./hooks/useSessionObject";
    // export { default as useBarChartSettings } from "./components/QdtPicasso/settings/barchart";
    // export { default as useLineChartSettings } from "./components/QdtPicasso/settings/lineChart";
    // export { default as usePieChartSettings } from "./components/QdtPicasso/settings/pieChart";
    // export { default as useScatterPlotSettings } from "./components/QdtPicasso/settings/scatterPlot";
    // export { default as useMerimekkoSettings } from "./components/QdtPicasso/settings/merimekko";
    // export { default as useTreemapSettings } from "./components/QdtPicasso/settings/treemap";
}
