// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;
pragma experimental ABIEncoderV2;

import "@layerzerolabs/onft-evm/contracts/onft721/ONFT721.sol";

contract Flash is ONFT721 {

    constructor(address _endpoint, uint _supply, uint _index) ONFT721("Flash", "FLS", _endpoint, msg.sender)
    {
        for(uint counter = _index; counter < _supply + _index;)
        {
            _mint(msg.sender, counter);
            unchecked {
                ++counter;
            }
        }
    }

}