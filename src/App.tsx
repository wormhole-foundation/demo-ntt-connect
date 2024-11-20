import { useState, useEffect } from 'react';
import WormholeConnect, { WormholeConnectConfig } from '@wormhole-foundation/wormhole-connect';
import { TokenForm } from './components/TokenForm';
import { UserTokenInput } from './types';
import { getQueryParams } from './utils/queryParams';
import { generateWormholeConfig } from './utils/configGenerator';
import './App.css';

function App() {
  const [config, setConfig] = useState<WormholeConnectConfig | null>(null);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const queryParams = getQueryParams();
    const requiredFields: (keyof UserTokenInput)[] = [
      'symbol',
      'manager',
      'token',
      'transceiver',
      'sourceChain',
      'destinationChain'
    ];

    const hasAllRequiredFields = requiredFields.every(field => 
      queryParams[field] !== undefined && queryParams[field] !== ''
    );

    if (hasAllRequiredFields) {
      const fullParams: UserTokenInput = {
        symbol: queryParams.symbol!,
        manager: queryParams.manager!,
        token: queryParams.token!,
        transceiver: queryParams.transceiver!,
        sourceChain: queryParams.sourceChain!,
        destinationChain: queryParams.destinationChain!,
        iconUrl: queryParams.iconUrl || 'https://wormhole.com/token.png',
        decimals: queryParams.decimals || 18,
        coinGeckoId: queryParams.coinGeckoId || 'wormhole'
      };
      handleTokenSubmit(fullParams);
      setShowForm(false);
    }
  }, []);

  const handleTokenSubmit = (tokenInput: UserTokenInput) => {
    const newConfig = generateWormholeConfig(tokenInput);
    setConfig(newConfig);
  };

  return (
    <div className="container">
      {showForm ? (
        <TokenForm 
          onSubmit={handleTokenSubmit} 
          setShowForm={setShowForm}
        />
      ) : (
        <div className="bridge-container">
          <button 
            className="back-button" 
            onClick={() => setShowForm(true)}
          >
            ← Configure New Token
          </button>
          <WormholeConnect config={config!} />
        </div>
      )}
    </div>
  );
}

export default App;