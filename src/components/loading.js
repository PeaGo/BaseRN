import React, { PureComponent } from "react";
import { ActivityIndicator, StyleSheet, View, Platform } from "react-native";
import { connect } from "react-redux";
import { sizeWidth, sizeHeight } from "../helper/size.helper";


class LoadingView extends PureComponent {
  render() {
    if (this.props.loading) {
      const size = Platform.OS === "ios" ? "large" : sizeWidth(9);
      return (
        <View style={styles.Loading}>
          <ActivityIndicator animating={true} size={size} color={'green'} />
        </View>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  Loading: {
    position: "absolute",
    width: sizeWidth(100),
    height: sizeHeight(100),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000033"
  }
});

function mapState(state) {
  return {
    loading: state.loadingState.loading
  };
}

export default connect(mapState)(LoadingView);
