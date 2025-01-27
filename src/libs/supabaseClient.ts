import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vlkgekxrqcimigtulvak.supabase.co'; // Замените на ваш URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsa2dla3hycWNpbWlndHVsdmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTU3MDEsImV4cCI6MjA1MjQzMTcwMX0.cKIg-0N2orGdrVfEPi5GD3dACoPwKQlniCD37Jt3WfE'; // Замените на ваш ключ
export const supabase = createClient(supabaseUrl, supabaseKey);