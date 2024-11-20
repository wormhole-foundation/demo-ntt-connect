import { useState, useEffect } from 'react';
import { Chain } from '@wormhole-foundation/wormhole-connect';
import { UserTokenInput } from '../types';
import { getQueryParams } from '../utils/queryParams';

interface TokenFormProps {
  onSubmit: (token: UserTokenInput) => void;
  setShowForm: (show: boolean) => void;
}

export function TokenForm({ onSubmit, setShowForm }: TokenFormProps) {
  const [tokenInput, setTokenInput] = useState<UserTokenInput>({
    symbol: '',
    manager: '',
    token: '',
    transceiver: '',
    sourceChain: 'Sepolia',
    destinationChain: 'BaseSepolia',
    iconUrl: 'https://wormhole.com/token.png',
    decimals: 18,
    coinGeckoId: 'wormhole',
  });

  const availableChains: Chain[] = ['Sepolia', 'BaseSepolia', 'ArbitrumSepolia', 'OptimismSepolia'];

  useEffect(() => {
    const queryParams = getQueryParams();
    if (Object.keys(queryParams).length > 0) {
      setTokenInput(prev => ({
        ...prev,
        ...queryParams
      }));
    }
  }, []);

  const updateUrlParams = (data: UserTokenInput) => {
    const params = new URLSearchParams();
    
    // Add all form fields to URL parameters
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, value.toString());
      }
    });

    // Update URL without reloading the page
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation is handled by HTML5 required attributes
    // If we reach here, the form is valid
    updateUrlParams(tokenInput);
    onSubmit(tokenInput);
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTokenInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="token-form">
      <div>
        <label htmlFor="symbol">Token Symbol</label>
        <input
          type="text"
          id="symbol"
          name="symbol"
          value={tokenInput.symbol}
          onChange={handleInputChange}
          placeholder="e.g., USDC"
          required
        />
      </div>
      <div>
        <label htmlFor="manager">Manager Address</label>
        <input
          type="text"
          id="manager"
          name="manager"
          value={tokenInput.manager}
          onChange={handleInputChange}
          placeholder="0x..."
          required
        />
      </div>
      <div>
        <label htmlFor="token">Token Address</label>
        <input
          type="text"
          id="token"
          name="token"
          value={tokenInput.token}
          onChange={handleInputChange}
          placeholder="0x..."
          required
        />
      </div>
      <div>
        <label htmlFor="transceiver">Transceiver Address</label>
        <input
          type="text"
          id="transceiver"
          name="transceiver"
          value={tokenInput.transceiver}
          onChange={handleInputChange}
          placeholder="0x..."
          required
        />
      </div>
      <div>
        <label htmlFor="decimals">Token Decimals</label>
        <input
          type="number"
          id="decimals"
          name="decimals"
          min="0"
          max="18"
          value={tokenInput.decimals}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="coinGeckoId">CoinGecko ID</label>
        <input
          type="text"
          id="coinGeckoId"
          name="coinGeckoId"
          value={tokenInput.coinGeckoId}
          onChange={handleInputChange}
          placeholder="e.g., bitcoin"
          required
        />
      </div>
      <div>
        <label htmlFor="iconUrl">Token Icon URL</label>
        <input
          type="url"
          id="iconUrl"
          name="iconUrl"
          value={tokenInput.iconUrl}
          onChange={handleInputChange}
          placeholder="https://example.com/token-icon.png"
        />
      </div>
      <div>
        <label htmlFor="sourceChain">Source Chain</label>
        <select
          id="sourceChain"
          name="sourceChain"
          value={tokenInput.sourceChain}
          onChange={handleInputChange}
          required
        >
          {availableChains.map(chain => (
            <option key={chain} value={chain}>{chain}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="destinationChain">Destination Chain</label>
        <select
          id="destinationChain"
          name="destinationChain"
          value={tokenInput.destinationChain}
          onChange={handleInputChange}
          required
        >
          {availableChains.map(chain => (
            <option key={chain} value={chain}>{chain}</option>
          ))}
        </select>
      </div>
      <button type="submit">Bridge Token</button>
    </form>
  );
} 