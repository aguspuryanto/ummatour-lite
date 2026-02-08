
export interface User {
  id: string;
  name: string;
  role: 'jamaah' | 'agent' | 'sub-agent';
  email: string;
  virtualAccount?: string;
  balance: number;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'commission';
  status: 'success' | 'pending' | 'failed';
  description: string;
}

export interface UmrahPackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  image: string;
  description: string;
}

export interface CommissionReport {
  totalCommission: number;
  pendingCommission: number;
  activeSubAgents: number;
  totalJamaah: number;
}
