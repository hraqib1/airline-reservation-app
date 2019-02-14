package com.revature.spark.todo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.revature.spark.beans.Customer;
import com.revature.spark.beans.Flight;

/**
 * Within this class, you will implement the logic to calculate data for various
 * reports.
 * 
 * @author Hassan Raqib
 * 
 */
public class AssociateImplementation {
	
	/**
	 * Find the total ticket sales of all flights.
	 * 
	 * @param flights
	 * @return
	 */
	public Double sum(List<Flight> flights) {
		double sum = 0;
		for(int i = 0; i < flights.size(); i++) {
			sum += flights.get(i).getTicketPrice();
		}
		return sum;
	}

	/**
	 * Find the lowest ticker price.
	 * 
	 * @param flights
	 * @return
	 */
	public double min(List<Flight> flights) {
		double result = 99999; 
        for(int i = 0; i < flights.size(); i++) {
            result = Math.min(result, flights.get(i).getTicketPrice());
        }
        return result;
    }
	

	/**
	 * Find the highest ticket price.
	 * 
	 * @param flights 
	 * @return
	 */
	public Double max(List<Flight> flights) {
		double max = flights.get(0).getTicketPrice();
		for(int i = 0; i < flights.size()-1; i++) {
			if(flights.get(i).getTicketPrice() > max) {
				max = flights.get(i).getTicketPrice();
				}
			}
		return max;
		}
		
		
	

	/**
	 * Find the average ticket price.
	 * 
	 * @param flights
	 * @return
	 */
	public Double avg(List<Flight> flights) {
		double divNumber = 0;
		double total = 0;
		for(int i = 0; i < flights.size(); i++) {
			total += flights.get(i).getTicketPrice();
			divNumber++;
		}
		double avg = total/divNumber;
		return avg;
	}

	/**
	 * Find the median ticket price.
	 * 
	 * @param flights
	 * @return
	 */
	public double median(List<Flight> flights) {
		double[] myArray = new double[flights.size()];
		double median = 0;
		
		for(int i = 0; i < flights.size(); i++) {
			myArray[i] = flights.get(i).getTicketPrice(); 
		}
		
		  for(int i = 0; i < myArray.length-1; i++) {
			   for (int j = 0; j < myArray.length - 1 - i; j++) {
	                if (myArray[j] > myArray[j+1]) { 
	                    double temp = myArray[j]; 
	                    myArray[j] = myArray[j+1]; 
	                    myArray[j+1] = temp; 
	                } 
			    }
		   }
		 if(flights.size() % 2 == 0) {
			 median = ((double)myArray[flights.size()/2] + (double)myArray[(flights.size()/2-1)])/2;
		 } else {
			 median =(double)myArray[flights.size()/2];
		 }
		return median;
	}

	/**
	 * !! BONUS CHALLENGE REQUIREMENT !!
	 * 
	 * Find the total sales for each customer given a list of Flights.
	 * 
	 * Let's look at some example data:
	 * 
	 * Flights 
	 * FlightNo | Destination | Departs | Ticket Price | Customer
	 * 1        | Albuquerque | Austin  |   $150       | A
	 * 2        | Denver      | Seattle |   $210       | B
	 * 3        | Dallas      | Orlando |   $190       | B
	 * 4        | Las Vegas   | Houston |   $300       | C
	 * 5        | Phoenix     | Atlanta |   $340       | A
	 * 6        | Tampa       | New York|   $270       | C
	 * -----------------------------------
	 * Results:
	 * Customer A : $490
	 * Customer B : $400
	 * Customer C : $570
	 * 
	 * @param flights
	 * @return
	 */
	public Map<Customer, Double> totalSalesPerCustomer(List<Flight> flights) {
		return new HashMap<>();
	}

}
