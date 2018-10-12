/**
 * @name QdtButton
 * @param {string} type [clearSelections, exportData, exportImg, exportPdf] - The button action
 * @param {string} title - The text on the button
 * @description
 * exportData, exportImg, exportPdf documentation:
 * https://help.qlik.com/en-US/sense-developer/September2018/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/QVisualization.htm
*/

import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { LuiButton } from 'qdt-lui';
import '../styles/index.scss';

export default class QdtButton extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      qAppPromise: PropTypes.object.isRequired,
      qVizPromise: PropTypes.object,
      type: PropTypes.oneOf(['clearSelections', 'exportData', 'exportImg', 'exportPdf']).isRequired,
      title: PropTypes.string.isRequired,
      block: PropTypes.string,
      options: PropTypes.obj,
    }
    static defaultProps = {
      block: false,
      qVizPromise: null,
      options: {},
    };

    // Sept 2018 BUG. Adds the current www folder in the path
    @autobind
    urlFix(url) {
      const tempUrl = url.split('/');
      const sbstrIndex = url.indexOf('tempcontent');
      const myUrl = `${tempUrl[0]}//${tempUrl[2]}/${url.substring(sbstrIndex, url.length)}`;
      return myUrl;
    }

    @autobind
    async action() {
      const {
        type, qDocPromise, qAppPromise, qVizPromise, options,
      } = this.props;
      const qDoc = (qDocPromise) ? await qDocPromise : null;
      const qApp = (qAppPromise) ? await qAppPromise : null;
      const qViz = (qVizPromise) ? await qVizPromise : null;
      switch (type) {
        default:
        case 'clearSelections':
          if (qApp) qApp.clearAll();
          if (qDoc) qDoc.clearAll();
          break;
        case 'exportData':
          if (qViz) {
            const myOptions = (options) || { format: 'CSV_T', state: 'P' };
            const url = await qViz.exportData(myOptions);
            const myUrl = this.urlFix(url);
            window.open(myUrl, '_blank');
          }
          break;
        case 'exportImg':
          if (qViz) {
            const myOptions = (options) || { width: 300, height: 400, format: 'JPG' };
            const url = await qViz.exportImg(myOptions);
            const myUrl = this.urlFix(url);
            window.open(myUrl, '_blank');
          }
          break;
        case 'exportPdf':
          if (qViz) {
            const myOptions = (options) || { documentSize: 'A4', orientation: 'landscape', aspectRatio: 2 };
            const url = await qViz.exportPdf(myOptions);
            const myUrl = this.urlFix(url);
            window.open(myUrl, '_blank');
          }
          break;
      }
    }

    render() {
      const { title, block } = this.props;
      return (
        <div>
          <LuiButton onClick={this.action} block={block}>
            {title}
          </LuiButton>
        </div>
      );
    }
}
