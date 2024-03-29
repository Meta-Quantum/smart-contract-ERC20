/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface ClaimableInterface extends ethers.utils.Interface {
  functions: {
    "addBlacklist(address)": FunctionFragment;
    "addMetaQuantumWallet(address)": FunctionFragment;
    "addWhiteListed(address)": FunctionFragment;
    "claimValues(address,address)": FunctionFragment;
    "disableBurnBeforeBlockNumber()": FunctionFragment;
    "disableTransfers(uint256)": FunctionFragment;
    "dropBlacklist(address)": FunctionFragment;
    "dropMetaQuantumWallet(address)": FunctionFragment;
    "dropWhiteListed(address)": FunctionFragment;
    "getBlacklist()": FunctionFragment;
    "getBurnBeforeBlockNumber()": FunctionFragment;
    "getBurnBeforeBlockNumberDisabled()": FunctionFragment;
    "getIsTransferDisabled()": FunctionFragment;
    "getMetaQuantumWallets()": FunctionFragment;
    "getWhiteListWallets()": FunctionFragment;
    "isBlacklisted(address)": FunctionFragment;
    "isMetaQuantumWallet(address)": FunctionFragment;
    "isWhiteListed(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addBlacklist",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "addMetaQuantumWallet",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "addWhiteListed",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "claimValues",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "disableBurnBeforeBlockNumber",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "disableTransfers",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "dropBlacklist",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "dropMetaQuantumWallet",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "dropWhiteListed",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getBlacklist",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBurnBeforeBlockNumber",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBurnBeforeBlockNumberDisabled",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getIsTransferDisabled",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMetaQuantumWallets",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getWhiteListWallets",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isBlacklisted",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isMetaQuantumWallet",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isWhiteListed",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "addBlacklist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addMetaQuantumWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addWhiteListed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimValues",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "disableBurnBeforeBlockNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "disableTransfers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dropBlacklist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dropMetaQuantumWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dropWhiteListed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBlacklist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBurnBeforeBlockNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBurnBeforeBlockNumberDisabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIsTransferDisabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMetaQuantumWallets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWhiteListWallets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isBlacklisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isMetaQuantumWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isWhiteListed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "DisableDefenseAntiBots(uint256,bool)": EventFragment;
    "InBlacklisted(address)": EventFragment;
    "InMetaQuantumWallet(address)": EventFragment;
    "InWhiteListWallet(address)": EventFragment;
    "OutBlacklisted(address)": EventFragment;
    "OutMetaQuantumWallet(address)": EventFragment;
    "OutWhiteListWallet(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "TransferBurned(address,uint256)": EventFragment;
    "ValueReceived(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DisableDefenseAntiBots"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "InBlacklisted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "InMetaQuantumWallet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "InWhiteListWallet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OutBlacklisted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OutMetaQuantumWallet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OutWhiteListWallet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferBurned"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ValueReceived"): EventFragment;
}

export class Claimable extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ClaimableInterface;

  functions: {
    addBlacklist(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "addBlacklist(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addMetaQuantumWallet(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "addMetaQuantumWallet(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addWhiteListed(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "addWhiteListed(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimValues(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "claimValues(address,address)"(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    disableBurnBeforeBlockNumber(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "disableBurnBeforeBlockNumber()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    disableTransfers(
      blocksDuration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "disableTransfers(uint256)"(
      blocksDuration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    dropBlacklist(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "dropBlacklist(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    dropMetaQuantumWallet(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "dropMetaQuantumWallet(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    dropWhiteListed(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "dropWhiteListed(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBlacklist(overrides?: CallOverrides): Promise<[string[]]>;

    "getBlacklist()"(overrides?: CallOverrides): Promise<[string[]]>;

    getBurnBeforeBlockNumber(overrides?: CallOverrides): Promise<[BigNumber]>;

    "getBurnBeforeBlockNumber()"(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getBurnBeforeBlockNumberDisabled(
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "getBurnBeforeBlockNumberDisabled()"(
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getIsTransferDisabled(overrides?: CallOverrides): Promise<[boolean]>;

    "getIsTransferDisabled()"(overrides?: CallOverrides): Promise<[boolean]>;

    getMetaQuantumWallets(overrides?: CallOverrides): Promise<[string[]]>;

    "getMetaQuantumWallets()"(overrides?: CallOverrides): Promise<[string[]]>;

    getWhiteListWallets(overrides?: CallOverrides): Promise<[string[]]>;

    "getWhiteListWallets()"(overrides?: CallOverrides): Promise<[string[]]>;

    isBlacklisted(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isBlacklisted(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isMetaQuantumWallet(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isMetaQuantumWallet(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isWhiteListed(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isWhiteListed(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addBlacklist(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "addBlacklist(address)"(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addMetaQuantumWallet(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "addMetaQuantumWallet(address)"(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addWhiteListed(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "addWhiteListed(address)"(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimValues(
    _token: string,
    _to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "claimValues(address,address)"(
    _token: string,
    _to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  disableBurnBeforeBlockNumber(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "disableBurnBeforeBlockNumber()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  disableTransfers(
    blocksDuration: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "disableTransfers(uint256)"(
    blocksDuration: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  dropBlacklist(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "dropBlacklist(address)"(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  dropMetaQuantumWallet(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "dropMetaQuantumWallet(address)"(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  dropWhiteListed(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "dropWhiteListed(address)"(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBlacklist(overrides?: CallOverrides): Promise<string[]>;

  "getBlacklist()"(overrides?: CallOverrides): Promise<string[]>;

  getBurnBeforeBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;

  "getBurnBeforeBlockNumber()"(overrides?: CallOverrides): Promise<BigNumber>;

  getBurnBeforeBlockNumberDisabled(overrides?: CallOverrides): Promise<boolean>;

  "getBurnBeforeBlockNumberDisabled()"(
    overrides?: CallOverrides
  ): Promise<boolean>;

  getIsTransferDisabled(overrides?: CallOverrides): Promise<boolean>;

  "getIsTransferDisabled()"(overrides?: CallOverrides): Promise<boolean>;

  getMetaQuantumWallets(overrides?: CallOverrides): Promise<string[]>;

  "getMetaQuantumWallets()"(overrides?: CallOverrides): Promise<string[]>;

  getWhiteListWallets(overrides?: CallOverrides): Promise<string[]>;

  "getWhiteListWallets()"(overrides?: CallOverrides): Promise<string[]>;

  isBlacklisted(_account: string, overrides?: CallOverrides): Promise<boolean>;

  "isBlacklisted(address)"(
    _account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isMetaQuantumWallet(
    _account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isMetaQuantumWallet(address)"(
    _account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isWhiteListed(_account: string, overrides?: CallOverrides): Promise<boolean>;

  "isWhiteListed(address)"(
    _account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "renounceOwnership()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addBlacklist(_account: string, overrides?: CallOverrides): Promise<void>;

    "addBlacklist(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    addMetaQuantumWallet(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "addMetaQuantumWallet(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    addWhiteListed(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "addWhiteListed(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    claimValues(
      _token: string,
      _to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "claimValues(address,address)"(
      _token: string,
      _to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    disableBurnBeforeBlockNumber(overrides?: CallOverrides): Promise<void>;

    "disableBurnBeforeBlockNumber()"(overrides?: CallOverrides): Promise<void>;

    disableTransfers(
      blocksDuration: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "disableTransfers(uint256)"(
      blocksDuration: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    dropBlacklist(_account: string, overrides?: CallOverrides): Promise<void>;

    "dropBlacklist(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    dropMetaQuantumWallet(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "dropMetaQuantumWallet(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    dropWhiteListed(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "dropWhiteListed(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getBlacklist(overrides?: CallOverrides): Promise<string[]>;

    "getBlacklist()"(overrides?: CallOverrides): Promise<string[]>;

    getBurnBeforeBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;

    "getBurnBeforeBlockNumber()"(overrides?: CallOverrides): Promise<BigNumber>;

    getBurnBeforeBlockNumberDisabled(
      overrides?: CallOverrides
    ): Promise<boolean>;

    "getBurnBeforeBlockNumberDisabled()"(
      overrides?: CallOverrides
    ): Promise<boolean>;

    getIsTransferDisabled(overrides?: CallOverrides): Promise<boolean>;

    "getIsTransferDisabled()"(overrides?: CallOverrides): Promise<boolean>;

    getMetaQuantumWallets(overrides?: CallOverrides): Promise<string[]>;

    "getMetaQuantumWallets()"(overrides?: CallOverrides): Promise<string[]>;

    getWhiteListWallets(overrides?: CallOverrides): Promise<string[]>;

    "getWhiteListWallets()"(overrides?: CallOverrides): Promise<string[]>;

    isBlacklisted(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isBlacklisted(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isMetaQuantumWallet(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isMetaQuantumWallet(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isWhiteListed(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isWhiteListed(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    DisableDefenseAntiBots(
      blockNumber: null,
      statusDefense: null
    ): TypedEventFilter<
      [BigNumber, boolean],
      { blockNumber: BigNumber; statusDefense: boolean }
    >;

    InBlacklisted(
      _account: string | null
    ): TypedEventFilter<[string], { _account: string }>;

    InMetaQuantumWallet(
      _account: string | null
    ): TypedEventFilter<[string], { _account: string }>;

    InWhiteListWallet(
      _account: string | null
    ): TypedEventFilter<[string], { _account: string }>;

    OutBlacklisted(
      _account: string | null
    ): TypedEventFilter<[string], { _account: string }>;

    OutMetaQuantumWallet(
      _account: string | null
    ): TypedEventFilter<[string], { _account: string }>;

    OutWhiteListWallet(
      _account: string | null
    ): TypedEventFilter<[string], { _account: string }>;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    TransferBurned(
      wallet: string | null,
      amount: null
    ): TypedEventFilter<
      [string, BigNumber],
      { wallet: string; amount: BigNumber }
    >;

    ValueReceived(
      sender: string | null,
      value: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber],
      { sender: string; value: BigNumber }
    >;
  };

  estimateGas: {
    addBlacklist(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "addBlacklist(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addMetaQuantumWallet(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "addMetaQuantumWallet(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addWhiteListed(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "addWhiteListed(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimValues(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "claimValues(address,address)"(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    disableBurnBeforeBlockNumber(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "disableBurnBeforeBlockNumber()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    disableTransfers(
      blocksDuration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "disableTransfers(uint256)"(
      blocksDuration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    dropBlacklist(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "dropBlacklist(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    dropMetaQuantumWallet(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "dropMetaQuantumWallet(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    dropWhiteListed(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "dropWhiteListed(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBlacklist(overrides?: CallOverrides): Promise<BigNumber>;

    "getBlacklist()"(overrides?: CallOverrides): Promise<BigNumber>;

    getBurnBeforeBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;

    "getBurnBeforeBlockNumber()"(overrides?: CallOverrides): Promise<BigNumber>;

    getBurnBeforeBlockNumberDisabled(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getBurnBeforeBlockNumberDisabled()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getIsTransferDisabled(overrides?: CallOverrides): Promise<BigNumber>;

    "getIsTransferDisabled()"(overrides?: CallOverrides): Promise<BigNumber>;

    getMetaQuantumWallets(overrides?: CallOverrides): Promise<BigNumber>;

    "getMetaQuantumWallets()"(overrides?: CallOverrides): Promise<BigNumber>;

    getWhiteListWallets(overrides?: CallOverrides): Promise<BigNumber>;

    "getWhiteListWallets()"(overrides?: CallOverrides): Promise<BigNumber>;

    isBlacklisted(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isBlacklisted(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isMetaQuantumWallet(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isMetaQuantumWallet(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isWhiteListed(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isWhiteListed(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addBlacklist(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "addBlacklist(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addMetaQuantumWallet(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "addMetaQuantumWallet(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addWhiteListed(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "addWhiteListed(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimValues(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "claimValues(address,address)"(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    disableBurnBeforeBlockNumber(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "disableBurnBeforeBlockNumber()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    disableTransfers(
      blocksDuration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "disableTransfers(uint256)"(
      blocksDuration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    dropBlacklist(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "dropBlacklist(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    dropMetaQuantumWallet(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "dropMetaQuantumWallet(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    dropWhiteListed(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "dropWhiteListed(address)"(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBlacklist(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getBlacklist()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBurnBeforeBlockNumber(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getBurnBeforeBlockNumber()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBurnBeforeBlockNumberDisabled(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getBurnBeforeBlockNumberDisabled()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getIsTransferDisabled(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getIsTransferDisabled()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMetaQuantumWallets(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getMetaQuantumWallets()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWhiteListWallets(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getWhiteListWallets()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isBlacklisted(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isBlacklisted(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isMetaQuantumWallet(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isMetaQuantumWallet(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isWhiteListed(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isWhiteListed(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
