import { format } from "date-fns";

const formatDate = (timestamp: number) => format(new Date(timestamp), "MMM d");
