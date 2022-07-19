import { ethers } from "ethers";

export class SDK {
  constructor(auth: any);
  /**
   * Deploy Contract on the blockchain
   * @param {string} template name of the template to use (ERC721Mintable, ...)
   * @param {object} params template parameters (name, symbol, contractURI, ...)
   * @returns {Promise<ERC721Mintable>} Contract instance
   */
  deploy({ template, params }: {template: string, params: object }): Promise<ERC721Mintable>;
  /**
   * Load a contract from an existing contract address and a template
   * @param {string} template name of the template to use (ERC721Mintable, ...)
   * @param {string} contractAddress address of the contract to load
   * @returns {Promise<ERC721Mintable>} Contract instance
   */
  loadContract({ template, contractAddress }: {template: string, contractAddress: string }): Promise<ERC721Mintable>;
  /**
   * Get contract metadata by contract address
   * @param {string} contractAddress
   * @returns {Promise<object>} Contract metadata object
   */
  getContractMetadata({ contractAddress }: string): Promise<object>;
  /**
   * Get NFTs by an account address
   * @param  {string} address Account address
   * @param  {boolean} [includeMetadata=false] flag to include the metadata object in the results
   * @returns {Promise<any>} List of NFTs with metadata if 'includeMetadata' flag is true
   */
  getNFTs({ publicAddress, includeMetadata }: {publicAddress: string, includeMetadata: boolean}): Promise<NFTResponse>;
  /** Get list of NFTs for the specified contract address
   * @param {string} contractAddress address of the contract to get the list of NFTs
   * @returns {Promise<any>} List of NFTs with metadata
   */
  getNFTsForCollection({ contractAddress }: string): Promise<NFTResponse>;
  /** Get a token metadata
   * @param {string} contractAddress address of the contract which holds the token
   * @param {number} tokenId ID of the token
   * @returns {Promise<object>} Token metadata
   */
  getTokenMetadata({ contractAddress, tokenId }: string): Promise<object>;
  #private;
}

export type NFTResponse =
  {
    "pageNumber": number,
    "network": string,
    "total": number,
    "account": string,
    "type": string,
    "assets": Array<NFTResponseObject>
  }

export type NFTResponseObject = {
  "contract": string,
  "tokenId": string,
  "supply": string,
  "type": string,
  "metadata": any
}

export class ERC721Mintable {
  constructor(signer: any);
  ADMIN_ROLE: string;
  MINTER_ROLE: string;
  contractAddress: any;
  getTemplate(): string;
  /**
   * Deploy ERC721Mintable Contract. Used by the SDK class
   * @param {string} name Name of the contract
   * @param {string} symbol Symbol of the contract
   * @param {string} contractURI ContractURI for the contract
   * (link to a JSON file describing the contract's metadata)
   * @returns void
   */
  deploy({ name, symbol, contractURI }: string): Promise<void>;
  /**
   * Set royalties information for the receiver address with the provided fee
   * @param {string} - address
   * @param {number} - fee
   * @returns {Promise<ethers.providers.TransactionResponse>} - Transaction
   */
  setRoyalties({ publicAddress, fee }: string): Promise<ethers.providers.TransactionResponse>;
  /**
   * Returns receiver address and royalty amount based on sell price
   * @param {number} - Token ID
   * @param {number} - Sell price
   * @returns {Promise<object>} - Returns receiver address and bigNumber
   * representing royalty amount based on sell price
   */
  royaltyInfo({ tokenId, sellPrice }: number): Promise<object>;
  /**
   * Mint function: Mint a token for publicAddress with the tokenURI provided
   * @param {string} publicAddress destination address of the minted token
   * @param {string} tokenURI link to the JSON object containing metadata about the token
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  mint({ publicAddress, tokenURI }: string): Promise<ethers.providers.TransactionResponse>;
  /**
   * Add minter function: Grant the 'minter' role to an address
   * @param {string} publicAddress the address to be elevated at 'minter' role
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  addMinter({ publicAddress }: string): Promise<ethers.providers.TransactionResponse>;
  /**
   * Renounce minter function: Renounce the 'minter' role
   * @param {string} publicAddress the address that will renounce its 'minter' role
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  renounceMinter({ publicAddress }: string): Promise<ethers.providers.TransactionResponse>;
  /**
   * Remove minter function: Remove the 'minter' role to an address
   * @param {string} publicAddress the address that will loose the 'minter' role
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  removeMinter({ publicAddress }: string): Promise<ethers.providers.TransactionResponse>;
  /**
   * Is minter function: Check if an address has the 'minter' role or not
   * @param {string} publicAddress the address to check
   * @returns {Promise<boolean>} Promise that will return a boolean
   */
  isMinter({ publicAddress }: string): Promise<boolean>;
  /**
   * Load an ERC721Mintable contract from an existing contract address. Used by the SDK class
   * @param {string} contractAddress Address of the ERC721Mintable contract to load
   * @returns void
   */
  loadContract({ contractAddress }: string): Promise<void>;
  /**
   * Transfer function: Transfer the token 'tokenId' between 'from' and 'to addresses.
   * @param {string} from Address who will transfer the token
   * @param {string} to Address that will receive the token
   * @param {number} tokenId ID of the token that will be transfered
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  transfer({ from, to, tokenId }: string): Promise<ethers.providers.TransactionResponse>;
  /**
   * setContractURI function: Set the "contractURI" metadata for the specified contract
   * @param {string} contractURI ContractURI for the contract
   * (URI to a JSON file describing the contract's metadata)
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  setContractURI({ contractURI }: string): Promise<ethers.providers.TransactionResponse>;
  /**
   * Add Admin function: Add the 'admin' role to an address. Only callable by
   * addresses with the admin role.
   * @param {string} publicAddress the address that will loose the 'minter' role
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  addAdmin({ publicAddress }: string): Promise<ethers.providers.TransactionResponse>;
  /**
   * Remove Admin function: Remove the 'admin' role to an address. Only callable by
   * addresses with the admin role.
   * @param {string} publicAddress the address that will loose the 'minter' role
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  removeAdmin({ publicAddress }: string): Promise<ethers.providers.TransactionResponse>;
  /**
   * Renounce Admin function: Remove the 'admin' role to an address. Only callable by
   * address invoking the request.
   * @param {string} publicAddress the address that will loose the 'minter' role
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  renounceAdmin({ publicAddress }: string): Promise<ethers.providers.TransactionResponse>;
  /**
   * Is Admin function: Check whether an address has the 'admin' role
   * @param {string} publicAddress the address to check
   * @returns {Promise<boolean>} Promise that will return a boolean
   */
  isAdmin({ publicAddress }: string): Promise<boolean>;
  /**
   * setApprovalForAll will give the full approval rights for a given address
   * @param {string} to Address which will receive the approval rights
   * @param {boolean} approvalStatus Boolean representing the approval to be given (true)
   *  or revoked (false)
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  setApprovalForAll({ to, approvalStatus }: string): Promise<ethers.providers.TransactionResponse>;
  /**
   * Gives permission to to to transfer tokenId token to another address.
   * @param {string} to the address that will be approved to do the transfer.
   * @param {number} tokenId tokenId the nft id to transfer.
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  approveTransfer({ to, tokenId }: string): Promise<ethers.providers.TransactionResponse>;
  /**
   * Renouncing ownership of the smart contract (will leave the contract without an owner).
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  renounceOwnership(): Promise<ethers.providers.TransactionResponse>;
  #private;
}
