import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

type AlertProps = {
  message: string;
  type?: "success" | "error" | "warning";
};

const Alert: React.FC<AlertProps> = ({ message, type = "error" }) => {
  const colors = {
    success: "text-gray-700 bg-green-50 ring-green-100",
    error: "text-gray-700 bg-red-50 ring-red-100",
    warning: "text-gray-700 bg-yellow-50 ring-yellow-100",
  };

  const icons = {
    success: <AlertTriangle className="text-green-500" />,
    error: <XCircle className="text-red-500" />,
    warning: <CheckCircle2 className="text-yellow-500" />,
  };

  return (
    <div role="alert" className={`flex w-full p-4 space-x-4 rounded-lg ring-1 ${colors[type]}`}>
      {icons[type]}
      <h3 className="text-sm font-medium">{message}</h3>
    </div>
  );
};

export default Alert;
