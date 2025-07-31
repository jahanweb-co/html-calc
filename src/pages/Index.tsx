import { Calculator } from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-foreground">ماشین حساب ساده</h1>
        <p className="text-lg text-muted-foreground">یک ماشین حساب ساده و کاربردی</p>
      </div>
      <Calculator />
    </div>
  );
};

export default Index;
