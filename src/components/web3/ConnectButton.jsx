import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Button } from '@/components/ui/button';

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <Button variant="outline" size="sm" onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button size="sm" onClick={() => connect({ connector: injected() })}>
      Connect Wallet
    </Button>
  );
}