Overview
Create a program in any programming language after understanding the below mentioned
business requirement.

Business Requirement
There is a large eCommerce company in India (let’s call it X) who gets a few thousand orders
via their website on a daily basis. Once the order is placed by the customer, X has to pack it as
fast as it can and deliver the order to the customer for which they have partnered with multiple
courier companies in India.
For delivering the goods to the customers, courier companies charge based on the following two
factors:
● Weight of the product
● Distance between X’s warehouse (pickup location) and customer’s delivery address
(destination location)
On an average, the delivery charges are Rs. 100 per shipment. So if X ships 1,00,000 orders
per month, they have to pay approximately Rs. 1 crore to the courier companies on a monthly
basis as charges.
The business problem is that a lot of times courier companies charge X higher than they should
due to their internal calculation errors.
This mainly happens because the courier company might not have recorded the weight correctly
while picking up the product or calculated distance between X’s warehouse and the customer’s
pincode incorrectly.
Most of the technical systems between X and courier companies are automated but due to
some or the other issues, billing is not always accurate. And as the charges that X has to pay
every month are very high (Rs 1 crore every month), a 10% overbilling will increase their bill by
Rs. 10 lakh every month.
Verifying the invoices manually for 1 lakh orders is extremely difficult and time consuming and
that’s where X requires a software which can help them verify the invoices automatically and
within a few minutes.

Software Requirement
Create a web-based software which will take the following three inputs from users:
● Weight of product in KG, upto two decimal points (user to input decimal value)
● 6-digit customer pincode (user to input customer pincode)
● Delivery type via drop down (user to choose between two options: “Forward” or “Forward
& RTO”)
Output of the software should be:
● Expected courier charge

Server-Side Logic Creation
Configure the following attached data in the code/database
● Company X - Pincode Zones
● Courier Company Rates
As soon as the user provides the required information, do the following:
● Round up the weight in a multiples of 0.5 KG (examples: 0.4 -> 0.5; 0.5 -> 0.5; 0.950 ->
1, 2.2 > 2.5)
● Take user given pincode and lookup in “Company X - Pincode Zones” to see applicable
zone
● Take rounded-up weight (step #1), applicable zone (step #2) and Delivery type (user
input) and calculate the expected rate using the “Courier Company Rates”
● Print expected courier charge output on the screen
