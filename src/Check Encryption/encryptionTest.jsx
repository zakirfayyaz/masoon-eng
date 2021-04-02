import React, { Component } from "react";
import encrypt from "./../utils/Encryption/GenerateAESKeys";
import decrypt from "./../utils/Encryption/GenerateRSAKeys";
class EncryptionTest extends Component {
  state = { arr: [1, 3, 4, 5, 6, 7, 7, 7] };
  render() {
    var data = this.state.arr;
    return (
      <>
        <h3>{encrypt(JSON.stringify(data))}</h3>
        <h3>{decrypt("fBPkkwknjpn+0EChovfw4wGBc+R/FAGcAVaPY87wKz0=")}</h3>
      </>
    );
  }
}

export default EncryptionTest;
