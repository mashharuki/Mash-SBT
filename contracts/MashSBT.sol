// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * MashSBT
 */
contract MashSBT is ERC721, ERC721URIStorage, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;
    mapping(address => uint256) private _balances;

    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    /**
     * constructor
     */
    constructor(string memory baseTokenUri_) payable ERC721("MashSBT", "MBT") {
        mintPrice = 0.0 ether;
        totalSupply = 0;
        maxSupply = 29;
        maxPerWallet = 29;
        baseTokenUri = baseTokenUri_;
        withdrawWallet = payable(0xf635736bab5f3b2d6c01304192Da098a760770E2);
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_)
        external
        onlyOwner
    {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(_exists(tokenId_), "Token does not exist!");
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(tokenId_),
                    ".json"
                )
            );
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            " "
        );
        require(success, "withdraw failed");
    }

    function mint(address to, uint256 quantity_) public payable {
        // require(isPublicMintEnabled, "minting not enabled");
        require(msg.value == quantity_ * mintPrice, "wrong not enabled");
        require(totalSupply + quantity_ <= maxSupply, "sold out");
        require(
            walletMints[to] + quantity_ <= maxPerWallet,
            "exceed max wallet"
        );
        walletMints[to]++;
        uint256 newTokenId = totalSupply + 1;
        totalSupply++;
        _safeMint(to, newTokenId);
        _balances[to]++;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721) {
        require(from == address(0), "Err: token is SOUL BOUND");
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        virtual
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function balanceOf(address _owner)
        public
        view
        override(ERC721)
        returns (uint256)
    {
        return _balances[_owner];
    }
}
