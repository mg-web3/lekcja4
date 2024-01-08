// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {PierwszyToken} from "../src/PierwszyToken.sol";

contract PTOKScript is Script {
    PierwszyToken public token;

    function setUp() public {}

    function run() public {
        uint256 privKey = vm.envUint("PRIVATE_KEY");
        address account = vm.addr(privKey);

        console2.log("Deployer's account address: ", account);

        vm.startBroadcast(privKey);

        PierwszyToken myContract = new PierwszyToken();

        vm.stopBroadcast();
    }
}
