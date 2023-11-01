import { useContractMetadata } from "@thirdweb-dev/react";

import Layout from "@/layout/Layout";
import { Metadata } from "@/types/metadata";
import ContractMetadata from "@/components/ContractMetadata";
import { getMarketplaceContract, getNFTContract } from "@/util/getContracts";

export default function Info() {
    const { nft_contract } = getNFTContract();
    const { marketplace } = getMarketplaceContract();
    const { data: nft_metadata, isLoading: nftMetadataLoading } = useContractMetadata(nft_contract);
    const { data: market_metadata, isLoading: marketMetadataLoading } = useContractMetadata(marketplace);

    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    Contract Details
                </h1>
                {
                    nftMetadataLoading || (marketMetadataLoading && (
                        <div className="text-center">
                            Loading Contract Info..
                        </div>
                    ))
                }
                {
                    market_metadata && (
                        <ContractMetadata
                            title={"NFT Marketplace Contract Metadata"}
                            metadata={market_metadata as Metadata}
                        />
                    )
                }
                {
                    nft_metadata && (
                        <ContractMetadata
                            title={"NFT Collection Contract Metadata"}
                            metadata={nft_metadata as Metadata}
                        />
                    )
                }
            </div>
        </Layout>
    );
}
