<template>
  <div v-if="myOrders" class="w-11/12 mx-auto border p-2 bg-white ">


  </div>
  <div
    class="w-11/12 mx-auto rounded-xl border shadow-lg mt-4 max-sm:mt-2 p-6 bg-white transition duration-300 ease-in-out">


    <div v-if="myOrders.status === 'FINISHED'" class=" text-xl w-full mx-auto"><span>You do not have active orders)</span></div>
    <div v-if="myOrders.client && myOrders.status !== 'FINISHED'" class=" border-b border-gray-300">
      <h2 class="text-xl font-semibold">Driver Information</h2>
      <div class="flex flex-col sm:flex-row justify-between mt-2">
        <div class="flex justify-center mb-2 sm:mb-0">
          <img :src="`http://localhost:5279/${myOrders?.driver?.driverPhoto?.path}`" alt="Driver Photo"
            class="h-full object-cover rounded-full w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32" />
        </div>


        <div class="mb-2 sm:mb-0">
          <span class="font-medium">Name:</span> {{ myOrders?.driver?.driverFullName }}
        </div>
        <div class="mb-2 sm:mb-0">
          <span class="font-medium">Phone:</span>
          <a :href="'tel:' + myOrders?.driver?.phoneNumber" class="text-blue-500 hover:text-blue-700">
            {{ myOrders?.driver?.phoneNumber }}
          </a>
        </div>
        <div class="mb-2 sm:mb-0">
          <span class="font-medium">Email:</span> {{ myOrders?.driver?.email }}
        </div>

      </div>
    </div>


    <BaseModal :btn-name="'Submit'" v-model:isOpen="editing" title="Add pictures and comment"
      @cancel-editing="isEditing === false" @action-function="submit()">
      <template #extraContent>
        <div class="w-12/12 mx-auto ">
          <label cla for="file"
            class="custom-file-upload flex flex-col items-center justify-center h-24 md:h-32 w-44 md:w-56 border-2 border-dashed border-gray-300 rounded-lg bg-white p-2 md:p-4 cursor-pointer shadow-md mx-auto ">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"
                class="h-8 w-8 md:h-12 md:w-12 text-gray-500">
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  <path fill=""
                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                    clip-rule="evenodd" fill-rule="evenodd"></path>
                </g>
              </svg>
            </div>
            <div class="text flex items-center justify-center">
              <span class="text-xs md:text-sm font-semibold text-gray-700">Click to upload images</span>
            </div>
            <input type="file" id="file" class="hidden" multiple v-on:change="handleFileChange">
          </label>


          <textarea v-model="comment"
            class="w-full resize-none text-xs mx-auto h-28  border border-gray-300 rounded-lg p-2 mt-2"
            placeholder="Your comment to the driver" />



          <div v-if="selectedFiles.length > 0" class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="(file, index) in selectedFiles" :key="index" class="relative">
              <img :src="getImageUrl(file)" :alt="file?.name" class="w-full h-auto rounded-lg" style="width: 120px;">
              <button @click="removeFile(index)"
                class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6">
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </template>
    </BaseModal>





    <div class="flex flex-col overflow-x-auto mt-4">
      <div v-if="myOrders && myOrders.status !== 'FINISHED'" class="flex flex-col min-w-max">
        <div class="flex flex-row font-semibold text-gray-700 bg-gray-200 p-4 rounded-t-lg">
          <div class="w-1/12">ID</div>
          <div class="w-2/12">Load Date</div>
          <div class="w-2/12">From</div>
          <div class="w-2/12">To</div>
          <div class="w-2/12">Status</div>
          <div class="w-2/12">Cost</div>
          <div class="w-2/12">Distance</div>
          <div class="w-2/12">Time until loading</div>
          <div v-if="!myOrders.comment" class="w-2/12">Upload images</div>
        </div>
        <div v-if="myOrders.createdAt" class="flex flex-col bg-white divide-y divide-gray-200">
          <div class="flex flex-row items-center p-4 transition duration-200 hover:bg-gray-100">
            <div class="w-1/12">{{ myOrders?.id }}</div>
            <div class="w-2/12">{{ formatDate(myOrders?.loadDayTime) }}</div>
            <div class="w-2/12">{{ myOrders?.fromRegion?.regionName }} <br />
              <span class="text-xs">{{ myOrders?.fromDistrict?.name }}</span>
            </div>
            <div class="w-2/12">{{ myOrders?.toRegion?.regionName }} <br />
              <span class="text-xs">{{ myOrders?.toDistrict?.name }}</span>
            </div>
            <div class="w-2/12">
              <span :class="`relative inline-block px-3 py-1 font-semibold leading-tight ${myOrders.status}`">
                <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                <span class="relative">{{ myOrders.status }}</span>
              </span>
            </div>
            <div class="w-2/12">{{ orderCost }}$</div>
            <div class="w-2/12">{{ distanceKm }} km</div>
            <div class="w-2/12">{{ formatTime(myOrders?.loadDayTime) }}</div>
            <button v-if="!myOrders.comment" @click="controlModal()" title="Add New"
              class="group cursor-pointer outline-none hover:rotate-90 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24"
                class="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke-width="1.5"></path>
                <path d="M8 12H16" stroke-width="1.5"></path>
                <path d="M12 16V8" stroke-width="1.5"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
    </div>

    <GMapMap  v-if="myOrders.startPoint && myOrders.status !== 'FINISHED'" class="z-30 w-full mt-2" :center="mapCenter(myOrders)" :zoom="mapZoom(myOrders)"
      map-type-id="terrain" style="height: 48vh">
      <GMapMarker :key="myOrders.id + '_start'"
        :position="{ lat: parseFloat(myOrders?.startPoint[0]), lng: parseFloat(myOrders.startPoint[1]) }"
        :clickable="false">
        <GMapInfoWindow :options="{ maxWidth: 200 }">
          <template #default>
            <div>
              <h1>{{ myOrders.fromRegion?.regionName }}</h1>
              <p>{{ myOrders.fromDistrict?.name }}</p>
            </div>
          </template>
        </GMapInfoWindow>
      </GMapMarker>

      <GMapMarker :key="myOrders.id + '_end'"
        :position="{ lat: parseFloat(myOrders.endPoint[0]), lng: parseFloat(myOrders.endPoint[1]) }" :clickable="false">
        <GMapInfoWindow :options="{ maxWidth: 200 }">
          <template #default>
            <div>
              <h1>{{ myOrders.toRegion?.regionName }}</h1>
              <p>{{ myOrders.toDistrict?.name }}</p>
            </div>
          </template>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
    <div  v-if="myOrders.status === 'FINISHED' && !myOrders.rating">
      <div class="flex justify-center mt-2">
      <div class="flex items-center">
        <div
          v-for="star in 5"
          :key="star"
          @click="setRating(star)"
          class="cursor-pointer transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :fill="star <= rating ? 'orange' : 'gray'"
            class="w-12 h-12 mx-1"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77 6.82 21l1.18-6.86-5-4.87 6.91-1.01L12 2z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-6">
      <button
        @click="submitRating()"
        class="border px-8 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-800 transition duration-300"
      >
        Done
      </button>
    </div>
    </div>
  </div>
  <BaseLoader :is-visible="loading" />
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import BaseLoader from '@/components/BaseLoader.vue';
import { IOrder } from '../Order/Steps/types';
import BaseModal from '@/components/BaseComponents/BaseModal.vue';
import BaseInput from '@/components/BaseComponents/BaseInput.vue';
import { useToast } from 'vue-toastification'




const toast = useToast();
const loading = ref(false);
const orderStore = useOrderStore();
const { myOrders } = storeToRefs(orderStore);
const distanceKm = ref(0);
const comment = ref('');
const selectedFiles = ref([]);
const editing = ref(false);
const user = localStorage.getItem("name");
const orderId = ref();
const orderCost = ref(0);
const { currentOrder } = storeToRefs(orderStore);
const rating = ref(0);

const setRating = (value: number) => {
  rating.value = value;
};

// Function to submit the rating
const submitRating = async () => {
  try {
    const response = await orderStore.rateOrder(orderId.value, rating.value)
    console.log(response);
    
    if (response === "success") {
      toast.success('Rating submitted successfully!');
    } else {
      toast.error('Failed to submit rating.');
    }
  } catch (error) {
    console.error(error);
    toast.error('An error occurred while submitting the rating.');
  }
};


const getUserOrders = async () => {
  try {
    loading.value = true;
    if (user !== null) {
      const data: IOrder = await orderStore.getOrderByUsername(user);
      currentOrder.value = data
      orderCost.value = calculateOrderCost(currentOrder.value)
      distanceKm.value = Math.floor(calculateDistance(currentOrder.value))



      if (distanceKm.value !== 0 && orderCost.value !== 0) {
        orderStore.setOrderCost(currentOrder.value.id, orderCost.value, distanceKm.value)
      }
    } else {
      console.log("User is not set!!");
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

function formatTime(inputDate: string): string {
  const loadTime = new Date(inputDate);
  const currentTime = new Date();

  const timeDifference = loadTime.getTime() - currentTime.getTime();
  const days = Math.floor(timeDifference / (1000 * 3600 * 24));
  const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));

  return `${days} days ${hours} hours ${minutes} minutes`;
}
const calculateOrderCost = (order: IOrder): number => {
  const baseCostPerKm = 0.5; //$0.5 per km
  distanceKm.value = Math.floor(calculateDistance(order))
  let cost = 0;

  const loadDayTime = new Date(order.loadDayTime);
  const month = loadDayTime.getMonth() + 1;
  if (month >= 11 || month <= 2) {
    cost += 1.2;
  } else {
    cost += 0.8;
  }

  cost += distanceKm.value * baseCostPerKm;


  const servicesCost = calculateServicesCost(order.services);
  cost += servicesCost;

  return Math.floor(parseFloat(cost));
};

const calculateServicesCost = (services: string[]): number => {
  const serviceCosts: Record<string, number> = {
    "An extra car": 10,
    "Packing/Unpacking": 5,
    "Warehouse": 15,
  };

  let totalCost = 0;
  services.forEach(service => {
    const cost = serviceCosts[service];
    if (cost) {
      totalCost += cost;
    }
  });

  return totalCost;
};



function calculateDistance(order: IOrder) {
  const lat1 = parseFloat(order.startPoint[0]);
  const lon1 = parseFloat(order.startPoint[1]);
  const lat2 = parseFloat(order.endPoint[0]);
  const lon2 = parseFloat(order.endPoint[1]);
  orderId.value = order.id;

  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}



function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


function mapCenter(order) {
  const startLat = parseFloat(order.startPoint[0]);
  const startLng = parseFloat(order.startPoint[1]);
  const endLat = parseFloat(order.endPoint[0]);
  const endLng = parseFloat(order.endPoint[1]);

  const centerLat = (startLat + endLat) / 2;
  const centerLng = (startLng + endLng) / 2;

  return { lat: centerLat, lng: centerLng };
}
function mapZoom(order) {
  console.log(order);

  const startLat = parseFloat(order.startPoint[0]);
  const startLng = parseFloat(order.startPoint[1]);
  const endLat = parseFloat(order.endPoint[0]);
  const endLng = parseFloat(order.endPoint[1]);
  const distance = Math.sqrt(Math.pow(endLat - startLat, 4) + Math.pow(endLng - startLng, 4));

  if (distance <= 1) {
    return 10;
  } else if (distance <= 10) {
    return 7;
  } else {
    return 8;
  }
}

const getImages = (e: InputEvent) => {
  const files = (e.target as HTMLInputElement).files;

  console.log(files);

}

const handleFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files || files.length === 0) return;

  for (const file of files) {
    selectedFiles.value.push(file);
  }
};

const getImageUrl = (file: File) => {
  if (typeof URL !== 'undefined' && URL.createObjectURL) {
    return URL.createObjectURL(file);
  } else {
    return '';
  }
};

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
};

const controlModal = () => {
  editing.value = !editing.value;
}

const submit = async () => {
  try {
    editing.value = false;
    loading.value = true;
    const data = new FormData();

    selectedFiles.value.forEach((file) => {
      data.append('images', file);
    });

    data.append('comment', comment.value);
    const res = await orderStore.userUpdateOrder(orderId.value, data);
    if (res.responseCode === 200) {
      toast.success('Order updated successfully');
      getUserOrders();
    }
  } catch (error) {
    console.error(error);
    toast.error('Error updating order');
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getUserOrders();
});
</script>
<style>
.custum-file-upload {
  height: 200px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cacaca;
  background-color: rgba(255, 255, 255, 1);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 48px 35px -48px rgba(0, 0, 0, 0.1);
}

.custum-file-upload .icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .icon svg {
  height: 80px;
  fill: rgba(75, 85, 99, 1);
}

.custum-file-upload .text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .text span {
  font-weight: 400;
  color: rgba(75, 85, 99, 1);
}

.custum-file-upload input {
  display: none;
}
</style>
