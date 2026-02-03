
import csv

def csv_to_sql(table, csv_file, columns):
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            vals = []
            for col in columns:
                v = row.get(col)
                if v is None or v == '' or v == '-':
                    vals.append('NULL')
                else:
                    # Escape single quotes and wrap in quotes if it contains non-numeric chars
                    # Simplified: wrap everything in quotes if not NULL
                    # But for numeric/boolean we might need care.
                    # Postgres handles '12.3' as numeric if requested.
                    escaped = str(v).replace("'", "''")
                    vals.append(f"'{escaped}'")
            
            print(f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({', '.join(vals)});")

print("-- Seeds for country")
csv_to_sql('country', 'server/data/country_test.csv', ['id', 'created_at', 'code', 'name'])

print("\n-- Seeds for units")
csv_to_sql('units', 'server/data/units_test.csv', ['id', 'created_at', 'code', 'name'])

print("\n-- Seeds for product")
csv_to_sql('product', 'server/data/product_test.csv', ['id', 'created_at', 'code', 'name', 'units_id', 'unit_price'])

print("\n-- Seeds for customer")
csv_to_sql('customer', 'server/data/customer_test.csv', ['id', 'created_at', 'code', 'name', 'address_line1', 'address_line2', 'country_id', 'credit_limit'])

print("\n-- Seeds for invoice")
csv_to_sql('invoice', 'server/data/invoice_test.csv', ['id', 'created_at', 'invoice_no', 'invoice_date', 'customer_id', 'total_amount', 'vat', 'amount_due'])

print("\n-- Seeds for invoice_line_item")
csv_to_sql('invoice_line_item', 'server/data/invoice_line_item_test.csv', ['id', 'created_at', 'invoice_id', 'product_id', 'quantity', 'unit_price', 'extended_price'])
