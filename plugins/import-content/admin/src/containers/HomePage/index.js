/*
 *
 * HomePage
 *
 */
import React, { memo, Component } from "react";
import {request} from "strapi-helper-plugin";
import PropTypes from "prop-types";
import pluginId from "../../pluginId";
import UploadFileForm from "../../components/UploadFileForm";
import {
  HeaderNav,
  LoadingIndicator,
  PluginHeader
} from "strapi-helper-plugin";
import Row from "../../components/Row";
import Block from "../../components/Block";
import { Select, Label } from "@buffetjs/core";
import { get, has, isEmpty, pickBy, set } from "lodash";

const getUrl = to =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

class HomePage extends Component {
  state = {
    analyzing: false,
    analysis: null
  };

  onRequestAnalysis = async analysisConfig => {
    this.analysisConfig = analysisConfig;
    this.setState({ analyzing: true }, async () => {
      try {
        const response = await request("/import-content/preAnalyzeImportFile", {
          method: "POST",
          body: analysisConfig
        });

        this.setState({ analysis: response, analyzing: false }, () => {
          strapi.notification.success(`Analyzed Successfully`);
        });
      } catch (e) {
        this.setState({ analyzing: false }, () => {
          strapi.notification.error(`Analyze Failed, try again`);
          strapi.notification.error(`${e}`);
        });
      }
    });
  };

render() {
   return (
    <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
    <PluginHeader
      title={"Import Content"}
      description={"Import CSV and RSS-Feed into your Content Types"}
    />
    <HeaderNav
      links={[
        {
          name: "Import Data",
          to: getUrl("")
        },
        {
          name: "Import History",
          to: getUrl("history")
        }
      ]}
      style={{ marginTop: "4.4rem" }}
    />
    <div className="row">
      <Block
        title="General"
        description="Configure the Import Source & Destination"
        style={{ marginBottom: 12 }}
      >
        <UploadFileForm
          onRequestAnalysis={this.onRequestAnalysis}
          loadingAnalysis={this.state.analyzing}
        />
      </Block>
    </div>
  </div>
    );
}
}
export default memo(HomePage);