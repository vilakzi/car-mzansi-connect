import { useState } from 'react';
import { Calculator, TrendingDown, Percent, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export const FinanceCalculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState(500000);
  const [deposit, setDeposit] = useState(100000);
  const [interestRate, setInterestRate] = useState([12]);
  const [loanTerm, setLoanTerm] = useState([60]);

  const calculateMonthlyPayment = () => {
    const principal = vehiclePrice - deposit;
    const monthlyRate = interestRate[0] / 100 / 12;
    const numberOfPayments = loanTerm[0];

    if (monthlyRate === 0) {
      return principal / numberOfPayments;
    }

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalAmount = monthlyPayment * loanTerm[0];
  const totalInterest = totalAmount - (vehiclePrice - deposit);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-primary rounded-lg shadow-glow">
            <Calculator className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Vehicle Finance Calculator</h1>
        <p className="text-muted-foreground">Calculate your monthly payments and total cost</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-gradient-card border-border/50 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vehicle-price" className="text-foreground">Vehicle Price</Label>
              <Input
                id="vehicle-price"
                type="number"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deposit" className="text-foreground">Deposit Amount</Label>
              <Input
                id="deposit"
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
                className="text-lg font-semibold"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-foreground">Interest Rate: {interestRate[0]}%</Label>
              <Slider
                value={interestRate}
                onValueChange={setInterestRate}
                max={25}
                min={5}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>5%</span>
                <span>25%</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-foreground">Loan Term: {loanTerm[0]} months</Label>
              <Slider
                value={loanTerm}
                onValueChange={setLoanTerm}
                max={84}
                min={12}
                step={6}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1 year</span>
                <span>7 years</span>
              </div>
            </div>

            <Button variant="premium" className="w-full">
              Calculate Payment
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-4">
          <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary-foreground/80">Monthly Payment</span>
                <TrendingDown className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold">{formatCurrency(monthlyPayment)}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Total Amount Payable</span>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{formatCurrency(totalAmount)}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Total Interest</span>
                <Percent className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{formatCurrency(totalInterest)}</div>
            </CardContent>
          </Card>

          <div className="bg-gradient-card rounded-lg p-6 border border-border/50">
            <h3 className="font-semibold text-foreground mb-4">Loan Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vehicle Price:</span>
                <span className="text-foreground font-medium">{formatCurrency(vehiclePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deposit:</span>
                <span className="text-foreground font-medium">{formatCurrency(deposit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loan Amount:</span>
                <span className="text-foreground font-medium">{formatCurrency(vehiclePrice - deposit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loan Term:</span>
                <span className="text-foreground font-medium">{loanTerm[0]} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest Rate:</span>
                <span className="text-foreground font-medium">{interestRate[0]}% p.a.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};